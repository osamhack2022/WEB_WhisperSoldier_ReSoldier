import { useState } from "react";
import { authService } from "../../lib/FAuth";
import { TimeStampToStr } from "../../modules/TimeStampToStr";
import { dbService, dbFunction } from "../../lib/FStore";
import PostCommentContent from "./PostCommentContent";
import PostCommentForm from "./PostCommentForm";
import { useSetRecoilState } from "recoil";
import { IsUpdatePostList } from "../../store/PostStore";

const PostCommentContainer = ({
  postInfo,
  state,
  setState,
  onChange,
  isTablet,
  isAdmin,
}) => {
  const {
    doc,
    addDoc,
    updateDoc,
    collection,
    serverTimestamp,
    getDocs,
    orderBy,
    query,
    where,
    startAfter,
    increment,
  } = dbFunction;

  const [nextCommentSnapshot, setNextCommentSnapshot] = useState({});
  const [postComments, setPostComments] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [errorCommentInfo, setCommentInfo] = useState(false);

  const setIsUpdatePostList = useSetRecoilState(IsUpdatePostList);

  const getPostCommentQuery = (isAddingComments) => {
    if (!isAddingComments) {
      return query(
        collection(dbService, "Comment"),
        where("associated_post_id", "==", postInfo.id),
        orderBy("created_timestamp", "desc")
      );
    } else {
      return query(
        collection(dbService, "Comment"),
        where("associated_post_id", "==", postInfo.id),
        orderBy("created_timestamp", "asc"),
        startAfter(nextCommentSnapshot)
      );
    }
  };
  const getPostComments = async (
    isAddingComments = false,
    isDeletingOrEditing = false
  ) => {
    const querySnapshot = await getDocs(getPostCommentQuery(isAddingComments));
    setNextCommentSnapshot(
      querySnapshot.docs.length === 0 ? null : querySnapshot.docs[0]
    );
    if (isDeletingOrEditing) {
      setPostComments([]);
    }

    querySnapshot.forEach((comment) => {
      const postCommentObj = {
        ...comment.data(),
        id: comment.id,
        created_timestamp: TimeStampToStr(comment.data().created_timestamp),
      };

      if (isAddingComments) {
        setPostComments((prev) => [...prev, postCommentObj]);
      } else {
        setPostComments((prev) => [postCommentObj, ...prev]);
      }
    });
    setIsLoadingComments(false);
  };

  const onCommentSubmit = async () => {
    if (state.comment.length === 0) {
      setCommentInfo(true);
      setTimeout(() => {
        setCommentInfo(false);
      }, 3000);
    } else {
      try {
        await addDoc(collection(dbService, "Comment"), {
          commentor_id: authService.currentUser.uid,
          associated_post_id: postInfo.id,
          comment_text: state.comment,
          comment_report: false,
          comment_rep_accept: false,
          like_count: 0,
          created_timestamp: serverTimestamp(),
        });
        const updateRef = doc(dbService, "WorryPost", postInfo.id);
        await updateDoc(updateRef, {
          comment_count: increment(1),
        });
        setIsUpdatePostList((prev) => ({
          ...prev,
          searchPage: true,
          newestPage: true,
          popularPage: true,
        }));
        alert("댓글이 정상적으로 업로드되었습니다.");
        setState((prev) => ({ ...prev, comment: "" }));
        getPostComments(true);
      } catch (error) {
        console.log("Error adding comment: ", error);
      }
    }
  };

  return (
    <>
      {!isAdmin && (
        <PostCommentForm
          state={state}
          onChange={onChange}
          onCommentSubmit={onCommentSubmit}
          errorCommentInfo={errorCommentInfo}
        ></PostCommentForm>
      )}

      <PostCommentContent
        postComments={postComments}
        getPostComments={getPostComments}
        isTablet={isTablet}
        setIsLoadingComments={setIsLoadingComments}
        isLoadingComments={isLoadingComments}
        isAdmin={isAdmin}
      ></PostCommentContent>
    </>
  );
};

export default PostCommentContainer;

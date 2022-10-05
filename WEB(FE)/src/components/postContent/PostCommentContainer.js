import { useState } from "react";
import { authService } from "../../lib/FAuth";
import { TimeStampToStr } from "../../modules/TimeStampToStr";
import { dbService, dbFunction } from "../../lib/FStore";
import PostCommentContent from "./PostCommentContent";
import PostCommentForm from "./PostCommentForm";

const PostCommentContainer = ({ postInfo, state, setState, onChange }) => {
  const {
    addDoc,
    collection,
    serverTimestamp,
    getDocs,
    orderBy,
    query,
    where,
    startAfter,
  } = dbFunction;

  const [latestVisibleComment, setLatestVisibleComment] = useState({});
  const [postComments, setPostComments] = useState([]);
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
        startAfter(latestVisibleComment)
      );
    }
  };
  const getPostComments = async (
    isAddingComments = false,
    isDeletingOrEditing = false
  ) => {
    const querySnapshot = await getDocs(getPostCommentQuery(isAddingComments));
    setLatestVisibleComment(
      querySnapshot.docs.length === 0 ? null : querySnapshot.docs[0]
    );
    if (isDeletingOrEditing) {
      setPostComments([]);
    }

    querySnapshot.forEach((comment) => {
      //console.log("[PostPage.js - comment.data()]",comment.data());
      //console.log("[PostPage.js - comment]",comment);
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
    console.log("comments :", querySnapshot.docs);
  };

  console.log(postComments);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, "Comment"), {
        commentor_id: authService.currentUser.uid,
        associated_post_id: postInfo.id,
        comment_text: state.comment,
        comment_report: false,
        comment_rep_accept: false,
        like_count: 0,
        created_timestamp: serverTimestamp(),
      });
      console.log("Comment written with ID:", docRef.id);
      alert("댓글이 정상적으로 업로드되었습니다.");
      setState((prev) => ({ ...prev, comment: "" }));
      setPostComments([]);
      getPostComments(true);
    } catch (error) {
      console.log("Error adding comment: ", error);
    }
  };

  return (
    <>
      <PostCommentForm
        state={state}
        onChange={onChange}
        onSubmit={onSubmit}
      ></PostCommentForm>
      <PostCommentContent
        postComments={postComments}
        getPostComments={getPostComments}
      ></PostCommentContent>
    </>
  );
};

export default PostCommentContainer;

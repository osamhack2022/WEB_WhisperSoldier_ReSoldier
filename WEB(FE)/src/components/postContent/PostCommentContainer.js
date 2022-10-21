import { useState } from "react";
import { TimeStampToStr } from "../../modules/TimeStampToStr";
import { dbService, dbFunction } from "../../lib/FStore";
import PostCommentContent from "./PostCommentContent";
import PostCommentForm from "./PostCommentForm";

const PostCommentContainer = ({
  postInfo,
  state,
  setState,
  onChange,
  isTablet,
  isAdmin,
  setAlertInfo,
}) => {
  const { collection, getDocs, orderBy, query, where, startAfter } = dbFunction;

  const [nextCommentSnapshot, setNextCommentSnapshot] = useState({});
  const [postComments, setPostComments] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [errorCommentInfo, setCommentInfo] = useState(false);

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

  return (
    <>
      {!isAdmin && (
        <PostCommentForm
          state={state}
          setState={setState}
          onChange={onChange}
          errorCommentInfo={errorCommentInfo}
          setCommentInfo={setCommentInfo}
          postInfo={postInfo}
          setAlertInfo={setAlertInfo}
          getPostComments={getPostComments}
        ></PostCommentForm>
      )}

      <PostCommentContent
        setPostComments={setPostComments}
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

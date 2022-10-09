import {
  deleteDoc,
  updateDoc,
  doc,
  query,
  collection,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { authService } from "../../lib/FAuth";
import { dbService } from "../../lib/FStore";
import {
  CommentBox,
  CommentButtonBox,
  CommentELementEditBox,
  CommentText,
  CommentTimeText,
  CommentTitle,
  CommentUserBox,
  CommentUserIcon,
  CommentUserText,
  DeleteCommentButton,
  EditComfirmButton,
  EditCommentButton,
  LikeCommentButton,
  PostChatCommentButton,
  ReportCommentButton,
} from "../../styles/PostContent/PostCommentElementStyle";

const PostCommentElement = ({
  commentElement,
  isOwner,
  getPostComments,
  created_timestamp,
  isTablet,
}) => {
  const [isEditingComment, setIsEditingComment] = useState(false);
  const [newComment, setNewComment] = useState(commentElement.comment_text);
  const [editCommentErrorInfo, setEditCommentErrorInfo] = useState(false);

  var nowUserId = authService.currentUser.uid;
  const [isLikedByMe, setIsLikedByMe] = useState(false);
  const likeCheckQuery = query(
    collection(dbService, "CommentLike"),
    where("associated_comment_id", "==", commentElement.id),
    where("user_id", "==", nowUserId)
  );

  const getIsLiked = async () => {
    const querySnapshot = await getDocs(likeCheckQuery);
    if (querySnapshot.docs.length === 0) {
      setIsLikedByMe(false);
    } else {
      setIsLikedByMe(true);
    }
    const afterLikeActionSnapshot = await getDocs(likeCheckQuery);
    await updateDoc(doc(dbService, "Comment", commentElement.id), {
      like_count: afterLikeActionSnapshot.docs.length,
    });
  };

  const toggleLike = async () => {
    const commentDocRef = doc(dbService, "Comment", commentElement.id);
    if (isLikedByMe) {
      const querySnapshot = await getDocs(likeCheckQuery);
      if (querySnapshot.docs.length === 0) {
        console.log("you have not liked this yet.");
      } else {
        querySnapshot.forEach((like) => {
          deleteDoc(doc(dbService, "CommentLike", like.id));
        });
      }
      setIsLikedByMe(false);
    } else {
      await addDoc(collection(dbService, "CommentLike"), {
        associated_comment_id: commentElement.id,
        user_id: nowUserId,
      });
      setIsLikedByMe(true);
      console.log("Liked");
    }
    const afterLikeActionSnapshot = await getDocs(likeCheckQuery);
    await updateDoc(commentDocRef, {
      like_count: afterLikeActionSnapshot.docs.length,
    });
  };

  const onDeleteCommentClick = async () => {
    const check = window.confirm("정말로 댓글을 삭제하시겠습니까?");
    if (check) {
      console.log(`deleting ${commentElement.id}`);
      await deleteDoc(doc(dbService, "Comment", commentElement.id)).then(
        alert("댓글이 삭제되었습니다.")
      );
      getPostComments(false, true);
      // 댓글창 업데이트 (isAddingComments = false, isDeletingComments = true)
    }
  };

  const toggleCommentEditing = () => {
    if (!isEditingComment) {
      setNewComment(commentElement.comment_text);
    }
    setIsEditingComment((prev) => !prev);
  };

  const onCommentEditAndSubmit = async (e) => {
    e.preventDefault();
    console.log("newComment.lenght === 0", newComment.length === 0);
    if (newComment.length === 0) {
      setEditCommentErrorInfo(true);
      setTimeout(() => {
        setEditCommentErrorInfo(false);
      }, 3000);
    } else {
      const check = window.confirm("정말로 댓글을 수정하시겠습니까?");
      if (check) {
        await updateDoc(doc(dbService, "Comment", commentElement.id), {
          comment_text: newComment,
        }).then(alert("댓글을 수정하였습니다."));
        setIsEditingComment(false);
        getPostComments(false, true);
      }
    }
  };

  const onCommentChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewComment(value);
  };

  useEffect(() => {
    getIsLiked();
  }, []);

  return (
    <CommentBox>
      <CommentTitle>
        <CommentUserBox>
          <CommentUserIcon></CommentUserIcon>
          <CommentUserText>익명</CommentUserText>
        </CommentUserBox>
        <CommentTimeText>{created_timestamp}</CommentTimeText>
        <div>공감 수: {commentElement.like_count}</div>
      </CommentTitle>
      {!isEditingComment ? (
        <CommentText>{commentElement.comment_text}</CommentText>
      ) : (
        <CommentELementEditBox
          newComment={newComment}
          onCommentChange={onCommentChange}
        ></CommentELementEditBox>
      )}
      {isOwner ? (
        <CommentButtonBox>
          <EditCommentButton
            toggleEditing={toggleCommentEditing}
            editing={isEditingComment}
            isMobile={!isTablet}
          ></EditCommentButton>
          {isEditingComment ? (
            <EditComfirmButton
              onCommentChange={onCommentEditAndSubmit}
              editCommentErrorInfo={editCommentErrorInfo}
              isMobile={!isTablet}
            ></EditComfirmButton>
          ) : (
            <DeleteCommentButton
              onDeleteClick={onDeleteCommentClick}
              isMobile={!isTablet}
            ></DeleteCommentButton>
          )}
        </CommentButtonBox>
      ) : (
        <CommentButtonBox>
          {isLikedByMe ? (
            <LikeCommentButton toggleLike={toggleLike} isMobile={!isTablet}>
              공감 취소하기
            </LikeCommentButton>
          ) : (
            <LikeCommentButton toggleLike={toggleLike} isMobile={!isTablet}>
              공감하기
            </LikeCommentButton>
          )}
          <PostChatCommentButton toLink="/" isMobile={!isTablet}>
            채팅하기
          </PostChatCommentButton>
          <ReportCommentButton toLink="/" isMobile={!isTablet}>
            신고하기
          </ReportCommentButton>
        </CommentButtonBox>
      )}
    </CommentBox>
  );
};

export default PostCommentElement;

/** 
 *         <form onSubmit={onCommentEditAndSubmit}>
          <textarea
            style={{ whiteSpace: "pre-wrap" }}
            value={newComment}
            onChange={onCommentChange}
          />
          <button type="submit">댓글 수정</button>
        </form>
*/

import { deleteDoc, updateDoc, doc } from "firebase/firestore";
import { useState } from "react";
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
} from "../../styles/PostContent/PostCommentElementStyle";

const PostCommentElement = ({
  commentElement,
  isOwner,
  getPostComments,
  created_timestamp,
}) => {
  const [isEditingComment, setIsEditingComment] = useState(false);
  const [newComment, setNewComment] = useState(commentElement.comment_text);
  const [editCommentErrorInfo, setEditCommentErrorInfo] = useState(false);
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

  return (
    <CommentBox>
      <CommentTitle>
        <CommentUserBox>
          <CommentUserIcon></CommentUserIcon>
          <CommentUserText>익명</CommentUserText>
        </CommentUserBox>
        <CommentTimeText>{created_timestamp}</CommentTimeText>
      </CommentTitle>
      {!isEditingComment ? (
        <CommentText>{commentElement.comment_text}</CommentText>
      ) : (
        <CommentELementEditBox
          newComment={newComment}
          onCommentChange={onCommentChange}
        ></CommentELementEditBox>
      )}
      {isOwner && (
        <CommentButtonBox>
          <EditCommentButton
            toggleEditing={toggleCommentEditing}
            editing={isEditingComment}
          ></EditCommentButton>
          {isEditingComment ? (
            <EditComfirmButton
              onCommentChange={onCommentEditAndSubmit}
              editCommentErrorInfo={editCommentErrorInfo}
            ></EditComfirmButton>
          ) : (
            <DeleteCommentButton
              onDeleteClick={onDeleteCommentClick}
            ></DeleteCommentButton>
          )}
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

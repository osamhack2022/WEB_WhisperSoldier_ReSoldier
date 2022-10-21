import { Dialog, DialogActions } from "@mui/material";
import { useCallback, useState } from "react";
import styled from "styled-components";
import { WsDialogTitle } from "../../styles/profile/CheckDefaultProfileImgDialogStyle";
import {
  CancelButton,
  ConfirmButton,
} from "../profile/CheckDefaultProfileImgNestDialog";

const PostCommentFormBox = styled.div`
  margin: 10px 0px 0px 0px;
  padding: 10px 20px;
  height: fit-content;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
`;

const PostCommentTextarea = styled.textarea`
  background-color: #fbfbfb;
  width: 100%;
  height: 33px;
  max-height: 30vh;
  font-size: 13px;
  overflow: hidden;
  white-space: pre-wrap;
  border: none;
  border-bottom: 1px solid #bdbdbd;
  padding: 7px 10px;

  resize: none;
  &:focus {
    outline: none;
  }
`;

const WriteCommentButtonShape = styled.button`
  margin-top: 5px;
  position: relative;
  padding: 0px 10px;
  color: ${(props) => (props.error ? "#ffffff" : "#0d552c")};
  height: 28px;
  width: ${(props) => (props.error ? "140px" : "90px")};
  background-color: ${(props) =>
    props.error ? "#a65646" : "rgba(0, 0, 0, 0)"};
  font-weight: 500;
  font-size: 11px;
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
  cursor: ${(props) => (props.error ? "default" : "pointer")};
  border: ${(props) =>
    props.error ? "1px solid rgb(166, 86, 70)" : "1px solid rgb(26, 117, 65)"};
  transition: all 0.5s;
  animation: ${(props) => (props.error ? "vibration 0.1s 5" : "none")};
  white-space: nowrap;
  &:hover {
    background: ${(props) => (props.error ? "#a65646" : "#0d552c")};
    color: ${(props) => (props.error ? "#ffffff" : "#ffffff")};
  }

  @keyframes vibration {
    from {
      transform: rotate(1deg);
    }
    to {
      transform: rotate(-1deg);
    }
  }
`;

export const WriteCommentButton = ({ onClick, errorCommentInfo, children }) => {
  return (
    <WriteCommentButtonShape onClick={onClick} error={errorCommentInfo}>
      {children}
    </WriteCommentButtonShape>
  );
};

const PostCommentForm = ({
  state,
  onChange,
  onCommentSubmit,
  errorCommentInfo,
  setCommentInfo,
}) => {
  const [openDialogForCreateComment, setOpenDialogForCreateComment] =
    useState(false);
  const handleClickOpenDialogForCreateComment = () => {
    if (state.comment.length === 0) {
      setCommentInfo(true);
      setTimeout(() => {
        setCommentInfo(false);
      }, 3000);
    } else {
      setOpenDialogForCreateComment(true);
    }
  };

  const handleCloseDialogForCreateComment = () => {
    setOpenDialogForCreateComment(false);
  };

  const onCreatComment = () => {
    onCommentSubmit();
    setOpenDialogForCreateComment(false);
  };

  const autoResizeTextarea = useCallback(() => {
    let textarea = document.querySelector(".autoTextarea");

    if (textarea) {
      textarea.style.height = "33px";
      let height = textarea.scrollHeight; // 높이
      textarea.style.height = `${height}px`;
    }
  }, []);
  return (
    <PostCommentFormBox>
      <PostCommentTextarea
        className="autoTextarea"
        name="comment"
        type="text"
        placeholder="댓글 작성"
        value={state.comment}
        onChange={onChange}
        maxLength={2000}
        onInput={autoResizeTextarea}
      ></PostCommentTextarea>
      <WriteCommentButton
        onClick={handleClickOpenDialogForCreateComment}
        errorCommentInfo={errorCommentInfo}
      >
        {errorCommentInfo ? "내용을 입력해주세요" : "댓글 작성하기"}
      </WriteCommentButton>
      <Dialog
        open={openDialogForCreateComment}
        onClose={handleCloseDialogForCreateComment}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <WsDialogTitle>댓글을 작성하시겠습니까?</WsDialogTitle>
        <DialogActions>
          <CancelButton
            onClick={handleCloseDialogForCreateComment}
            color="primary"
            autoFocus
          >
            취소
          </CancelButton>
          <ConfirmButton color="primary" onClick={onCreatComment}>
            댓글 작성
          </ConfirmButton>
        </DialogActions>
      </Dialog>
    </PostCommentFormBox>
  );
};

export default PostCommentForm;

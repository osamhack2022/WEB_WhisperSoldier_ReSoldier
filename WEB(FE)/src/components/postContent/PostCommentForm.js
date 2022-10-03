import { useCallback } from "react";
import { TbSend } from "react-icons/tb";
import styled from "styled-components";

const PostCommentFormBox = styled.div`
  margin: 10px 0px 0px 10px;
  padding: 10px 20px;
  height: fit-content;
  width: 45vw;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
`;

const PostCommentTextarea = styled.textarea`
  background-color: #fbfbfb;
  width: 42vw;
  max-height: 30vh;
  white-space: pre-wrap;
  border: none;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const BottonLine = styled.div`
  margin: 1px 0px;
  border-top: 2px solid #bdbdbd;
`;

const WritePostButtonShape = styled.button`
  margin-top: 5px;
  position: relative;
  padding: 0px 10px;
  color: #ffffff;
  height: 28px;
  width: 110px;
  background-color: #1a7541;
  font-weight: 500;
  font-size: 11px;
  text-align: right;
  text-decoration: none;
  border-radius: 25px;
  border: 2px solid rgb(26, 117, 65);
  transition: all 0.5s;
  &:hover {
    background: #0d552c;
  }
`;

const WritPostIcon = styled(TbSend)`
  position: absolute;
  top: 50%;
  left: 15%;
  transform: translate(0%, -50%);
  background-color: rgba(0, 0, 0, 0);
  color: #ffffff;
`;

export const WriteCommentButton = ({ onClick, children }) => {
  return (
    <WritePostButtonShape name="submitComment" onClick={onClick}>
      <WritPostIcon></WritPostIcon> {children}
    </WritePostButtonShape>
  );
};

const PostCommentForm = ({ state, onChange, onSubmit }) => {
  const autoResizeTextarea = useCallback(() => {
    let textarea = document.querySelector(".autoTextarea");

    if (textarea) {
      textarea.style.height = "auto";
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
      <BottonLine></BottonLine>
      <WriteCommentButton onClick={onSubmit}>댓글 작성하기</WriteCommentButton>
    </PostCommentFormBox>
  );
};

export default PostCommentForm;

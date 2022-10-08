import { useCallback } from "react";
import { TbSend } from "react-icons/tb";
import styled from "styled-components";

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
  border-top: 1px solid #bdbdbd;
`;

const WriteCommentButtonShape = styled.button`
  margin-top: 5px;
  position: relative;
  padding: 0px 10px;
  color: #0d552c;
  height: 28px;
  width: 90px;
  background-color: rgba(0, 0, 0, 0);
  font-weight: 500;
  font-size: 11px;
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
  border: 1px solid rgb(26, 117, 65);
  transition: all 0.5s;
  &:hover {
    background: #0d552c;
    color: #ffffff;
  }
`;

const ErrorCommentButtonShape = styled.button`
  margin-top: 5px;
  position: relative;
  padding: 0px 10px;
  color: #ffffff;
  height: 28px;
  width: 140px;
  background-color: #a65646;
  font-weight: 500;
  font-size: 11px;
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
  border: 1px solid rgb(166, 86, 70);
  transition: all 0.5s;
  animation: vibration 0.1s 5;

  @keyframes vibration {
    from {
      transform: rotate(1deg);
    }
    to {
      transform: rotate(-1deg);
    }
  }
`;

const WritCommentIcon = styled(TbSend)`
  position: absolute;
  top: 50%;
  left: 15%;
  transform: translate(0%, -50%);
  background-color: rgba(0, 0, 0, 0);
  color: #0d552c;
  &:hover {
    color: #ffffff;
  }
`;

export const WriteCommentButton = ({ onClick, children }) => {
  return (
    <WriteCommentButtonShape onClick={onClick}>
      {children}
    </WriteCommentButtonShape>
  );
};

//<WritCommentIcon></WritCommentIcon>

const PostCommentForm = ({
  state,
  onChange,
  onCommentSubmit,
  errorCommentInfo,
}) => {
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
      {errorCommentInfo ? (
        <ErrorCommentButtonShape>내용을 입력해주세요</ErrorCommentButtonShape>
      ) : (
        <WriteCommentButton onClick={onCommentSubmit}>
          댓글 작성하기
        </WriteCommentButton>
      )}
    </PostCommentFormBox>
  );
};

export default PostCommentForm;

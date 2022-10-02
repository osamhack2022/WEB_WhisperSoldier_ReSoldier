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
  width: 41vw;
  height: max-content;
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

const PostCommentForm = ({ state, onChange, onSubmit }) => {
  return (
    <PostCommentFormBox>
      <PostCommentTextarea
        name="comment"
        type="text"
        placeholder="댓글 작성"
        value={state.comment}
        onChange={onChange}
        maxLength={2000}
      ></PostCommentTextarea>
      <BottonLine></BottonLine>
      <button onClick={onSubmit}>댓글 작성하기</button>
    </PostCommentFormBox>
  );
};

export default PostCommentForm;

import styled from "styled-components";
import PostContentBodyEditHeader from "./PostContentBodyEditHeader";

const PostContentBox = styled.div`
  margin: 10px 0px 0px 10px;
  padding: 20px 20px;
  height: fit-content;
  width: 45vw;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
`;

const PostContentText = styled.div`
  font-size: 14px;
  text-align: left;
  letter-spacing: 0.56px;
  color: #1d1d1d;
  font-weight: 400;
`;

const InputForm = styled.textarea`
  background-color: #fbfbfb;
  width: 41vw;
  height: 47vh;
  white-space: pre-wrap;
  border: none;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const BottonLine = styled.div`
  margin: 5px 0px;
  border-top: 2px solid #bdbdbd;
`;

const PostContentBody = ({ postInfo, state, onChange, editing, onClick }) => {
  return (
    <PostContentBox>
      {editing ? (
        <>
          <PostContentBodyEditHeader
            onClick={onClick}
          ></PostContentBodyEditHeader>
          <InputForm
            name="editContent"
            value={state.editContent}
            type="text"
            required
            onChange={onChange}
          ></InputForm>
          <BottonLine></BottonLine>
        </>
      ) : (
        <PostContentText>{postInfo.postContent}</PostContentText>
      )}
    </PostContentBox>
  );
};

export default PostContentBody;

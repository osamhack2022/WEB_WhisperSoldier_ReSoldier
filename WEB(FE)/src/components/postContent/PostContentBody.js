import styled from "styled-components";
import PostContentBodyEditHeader from "./PostContentBodyEditHeader";

const PostContentBox = styled.div`
  margin: 10px 0px 0px 0px;
  padding: 20px 20px;
  height: fit-content;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
`;

const PostContentText = styled.div`
  white-space: pre-wrap;
  font-size: 14px;
  text-align: left;
  letter-spacing: 0.56px;
  color: #1d1d1d;
  white-space: pre-wrap;
  font-weight: 400;
`;

const PostContentErrorText = styled.div`
  white-space: pre-wrap;
  font-size: 14px;
  text-align: center;
  letter-spacing: 0.56px;
  color: #1d1d1d;
  white-space: pre-wrap;
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

const PostContentBody = ({
  postInfo,
  state,
  onChange,
  editing,
  onClick,
  errorPostInfo,
  errorEditInfo,
}) => {
  return (
    <PostContentBox>
      {editing ? (
        <>
          <PostContentBodyEditHeader
            onClick={onClick}
            errorEditInfo={errorEditInfo}
          ></PostContentBodyEditHeader>
          <InputForm
            name="editContent"
            value={state.editContent}
            type="text"
            required
            onChange={onChange}
          ></InputForm>
          <BottonLine></BottonLine>
          <input
            name="editTag"
            value={state.editTag}
            type="text"
            required
            onChange={onChange}
          ></input>
        </>
      ) : !errorPostInfo ? (
        <PostContentText>{postInfo.postContent}</PostContentText>
      ) : (
        <PostContentErrorText>
          찾으려는 포스트가 존재하지 않습니다.
        </PostContentErrorText>
      )}
    </PostContentBox>
  );
};

export default PostContentBody;

import styled from "styled-components";
import media from "../../modules/MediaQuery";
import WritePostHeader from "./WriteInputBoxHeader";

const InputBox = styled.div`
  margin-left: 10px;
  padding: 20px;
  height: 60vh;
  flex-grow: 1;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
  ${media.mobile`
  margin-top: 10px;
  margin-left: inherit;
  width: inherit;
  `}
`;

const InputForm = styled.textarea`
  background-color: #fbfbfb;
  width: 100%;
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
  border-top: 1px solid #bdbdbd;
`;

const WritePostBox = ({ state, onChange, onClick, errorWritePostInfo }) => {
  return (
    <InputBox>
      <WritePostHeader
        onClick={onClick}
        errorWritePostInfo={errorWritePostInfo}
      ></WritePostHeader>
      <InputForm
        name="postContent"
        placeholder="여기를 클릭하여 고민글을 작성해보세요!"
        type="text"
        value={state.postContent}
        onChange={onChange}
        required
      ></InputForm>
      <BottonLine></BottonLine>
    </InputBox>
  );
};

export default WritePostBox;

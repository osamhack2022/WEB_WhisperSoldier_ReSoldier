import styled from "styled-components";
import WritePostHeader from "./WriteInputBoxHeader";

const InputBox = styled.div`
  margin-left: 10px;
  padding: 20px;
  height: 60vh;
  width: 50vw;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
`;

const InputForm = styled.textarea`
  background-color: #fbfbfb;
  width: 46.6vw;
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

const WritePostBox = ({ state, onChange, onClick }) => {
  return (
    <InputBox>
      <WritePostHeader onClick={onClick}></WritePostHeader>
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

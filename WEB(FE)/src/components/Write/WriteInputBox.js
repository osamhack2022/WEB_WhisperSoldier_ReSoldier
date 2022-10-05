import styled from "styled-components";
import WritePostHeader from "./WriteInputBoxHeader";

const InputBoxForDesktop = styled.div`
  margin-left: 10px;
  padding: 20px;
  height: 60vh;
  flex-grow: 1;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
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

const InputBoxForTablet = styled.div`
margin-left: 10px;
  padding: 20px;
  height: 60vh;
  flex-grow: 1;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
`;

const InputFormForTablet = styled.textarea`
  background-color: #fbfbfb;
  width: inherit;
  height: 47vh;
  white-space: pre-wrap;
  border: none;
  resize: none;
  &:focus {
    outline: none;
  }

`;

const InputBoxForMobile = styled.div`
margin-top: 10px;
  padding: 20px;
  height: 60vh;
  width: inherit;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
`;

const InputFormForMobile = styled.textarea`
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

const InputBox = ({isDesktop,
  isTablet,children}) => {
    return (<>{isDesktop?(<InputBoxForDesktop>{children}</InputBoxForDesktop>):(isTablet?<InputBoxForTablet>{children}</InputBoxForTablet>:<InputBoxForMobile>{children}</InputBoxForMobile>)}</>)

}


const WritePostBox = ({
  state,
  onChange,
  onClick,
  errorWritePostInfo,
  isDesktop,
  isTablet,
}) => {
  return (
    <>
      {isTablet ? (
        <InputBox isDesktop={isDesktop} isTablet={isTablet}>
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
      ) : (
        <InputBoxForMobile>
          <WritePostHeader
            onClick={onClick}
            errorWritePostInfo={errorWritePostInfo}
          ></WritePostHeader>
          <InputFormForMobile
            name="postContent"
            placeholder="여기를 클릭하여 고민글을 작성해보세요!"
            type="text"
            value={state.postContent}
            onChange={onChange}
            required
          ></InputFormForMobile>
          <BottonLine></BottonLine>
        </InputBoxForMobile>
      )}
    </>
  );
};

export default WritePostBox;

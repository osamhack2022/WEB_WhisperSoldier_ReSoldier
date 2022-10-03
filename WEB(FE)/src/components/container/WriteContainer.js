import styled from "styled-components";
import { BackButton } from "../common/Buttons";
import SideButtonBox from "../common/SideButtonBox";
import SideOptionForm from "../common/SideOptionForm";
import WritePostBox from "../Write/WriteInputBox";

const WriteContainerBox = styled.div`
  padding: 0px 10vw;
  display: flex;
  flex-direction: row;
`;

const SideOptionContainer = styled.div`
  margin-left: 10px;
  height: fit-content;
  flex-grow: 1;
`;

const WriteContainer = ({ state, onChange, onClick, errorWritePostInfo }) => {
  return (
    <>
      <WriteContainerBox>
        <SideButtonBox>
          <BackButton toLink="/">뒤로가기</BackButton>
        </SideButtonBox>
        <WritePostBox
          state={state}
          onChange={onChange}
          onClick={onClick}
          errorWritePostInfo={errorWritePostInfo}
        ></WritePostBox>
        <SideOptionContainer>
          <SideOptionForm></SideOptionForm>
        </SideOptionContainer>
      </WriteContainerBox>
    </>
  );
};

export default WriteContainer;

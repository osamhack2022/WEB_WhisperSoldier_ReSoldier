import { WriteContainerBox } from "../../styles/write/WriteContainerStyle";
import { BackButton } from "../common/Buttons";
import SideButtonBox from "../common/SideButtonBox";
import { SideOptionForm } from "../common/SideOptionForm";
import WritePostBox from "./WriteInputBox";
import { SideOptionContainer } from "../../styles/write/WriteContainerStyle";

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

import { WriteContainerBox } from "../../styles/write/WriteContainerStyle";
import { BackButton } from "../common/Buttons";
import SideButtonBox from "../common/SideButtonBox";
import { SideOptionForm } from "../common/SideOptionForm";
import WritePostBox from "./WriteInputBox";
import { SideOptionContainer } from "../../styles/write/WriteContainerStyle";
import { useNavigate } from "react-router-dom";

const WriteContainer = ({ state, onChange, onClick, errorWritePostInfo }) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      <WriteContainerBox>
        <SideButtonBox>
          <BackButton goBack={goBack}>뒤로가기</BackButton>
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

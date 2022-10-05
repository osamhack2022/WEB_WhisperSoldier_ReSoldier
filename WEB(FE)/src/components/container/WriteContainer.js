import styled from "styled-components";
import { WriteContainerBox } from "../../styles/write/WriteContainerStyle";
import { BackButton } from "../common/Buttons";
import SideButtonBox from "../common/SideButtonBox";
import { SideOptionForm } from "../common/SideOptionForm";
import WritePostBox from "../Write/WriteInputBox";
import { SideOptionContainer } from "../../styles/write/WriteContainerStyle";

const WriteContainer = ({
  state,
  onChange,
  onClick,
  errorWritePostInfo,
  isDesktop,
  isTablet,
}) => {
  return (
    <>
      <WriteContainerBox isDesktop={isDesktop} isTablet={isTablet}>

          <SideButtonBox isDesktop={isDesktop} isTablet={isTablet}>
            <BackButton toLink="/">뒤로가기</BackButton>
          </SideButtonBox>

        <WritePostBox
          state={state}
          onChange={onChange}
          onClick={onClick}
          errorWritePostInfo={errorWritePostInfo}
          isDesktop={isDesktop}
          isTablet={isTablet}
        ></WritePostBox>
        <SideOptionContainer isDesktop={isDesktop} isTablet={isTablet}>
          <SideOptionForm></SideOptionForm>
        </SideOptionContainer>
      </WriteContainerBox>
      
    </>
  );
};

export default WriteContainer;
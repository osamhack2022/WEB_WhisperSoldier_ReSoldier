import styled from "styled-components";
import { WriteContainerBox } from "../../styles/write/WriteContainerStyle";
import { BackButton } from "../common/Buttons";
import SideButtonBox from "../common/SideButtonBox";
import { SideOptionForm } from "../common/SideOptionForm";
import WritePostBox from "../Write/WriteInputBox";

const SideOptionContainer = styled.div`
  margin-left: 10px;
  height: fit-content;
  flex-grow: 1;
`;

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
        {isTablet && (
          <SideButtonBox isDesktop={isDesktop} isTablet={isTablet}>
            <BackButton toLink="/">뒤로가기</BackButton>
          </SideButtonBox>
        )}
        <WritePostBox
          state={state}
          onChange={onChange}
          onClick={onClick}
          errorWritePostInfo={errorWritePostInfo}
          isDesktop={isDesktop}
          isTablet={isTablet}
        ></WritePostBox>
        {!isTablet && (
          <SideButtonBox isDesktop={isDesktop} isTablet={isTablet}>
            <BackButton toLink="/">뒤로가기</BackButton>
          </SideButtonBox>
        )}
      </WriteContainerBox>
    </>
  );
};

export default WriteContainer;

/*
        <SideOptionContainer>
          <SideOptionForm></SideOptionForm>
        </SideOptionContainer>
*/

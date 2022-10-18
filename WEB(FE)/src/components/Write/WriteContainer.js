import { useNavigate } from "react-router-dom";
import {
  MainContentContainer,
  WriteContainerBox,
} from "../../styles/write/WriteContainerStyle";
import { BackButton } from "../common/Buttons";
import SideButtonBox from "../common/SideButtonBox";
import { SideOptionForm } from "../common/SideOptionForm";
import WritePostBox from "./WriteInputBox";
import { SideOptionContainer } from "../../styles/write/WriteContainerStyle";
import styled from "styled-components";
import media from "../../modules/MediaQuery";

const ButtonContainerForTest = styled.div`
  display: flex;
  //flex-direction: column;
  flex-direction: row;
  /* justify-content: center; */
  justify-content: flex-start;
  /* align-items: center; */
  align-items: inherit;
  height: fit-content;
  /* width: 110px; */
  width: 100%;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
  padding: 0px 0px 0px 20px;
  margin-top: ${(props) => props.isNotTop && "10px"};
  transition: all 0.5s;
  ${media.mobile`
  //flex-direction: row;
  //justify-content: flex-start;
  /* align-items : inherit; */
  /* width: 100%; */
  padding: 0px 0px 0px 10px;
  `}
`;

const SideButtonBoxForTest = ({ children, isNotTop }) => {
  return (
    <ButtonContainerForTest isNotTop={isNotTop}>
      {children}
    </ButtonContainerForTest>
  );
};

const WriteContainer = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <WriteContainerBox>
      <MainContentContainer>
        <SideButtonBoxForTest>
          <BackButton goBack={goBack} notRight={true}>
            뒤로가기
          </BackButton>
        </SideButtonBoxForTest>

        <WritePostBox navigate={navigate} />
      </MainContentContainer>
      <SideOptionContainer>
        <SideOptionForm />
      </SideOptionContainer>
    </WriteContainerBox>
  );
};

export default WriteContainer;

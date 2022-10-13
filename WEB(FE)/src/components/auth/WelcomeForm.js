import styled from "styled-components";
import {
  AuthButton,
  FindPasswordButton,
  FindPasswordButtonContainer,
  FindPasswordButtonsContainer,
} from "../common/Buttons";
import { AuthInputBox } from "../common/InputBox";
import { FirstComment } from "../common/Logos";
import AuthTemplate from "./AuthTemplate";
const Block1 = styled.div`
  margin: 70px 0px 70px 0px;
`;
const WelcomeForm = () => {
  return (
    <AuthTemplate>
      <FirstComment>닉네임을 설정해주세요!</FirstComment>
      <Block1></Block1>
      <form>
        <AuthInputBox placeholder="닉네임을 입력해주세요"></AuthInputBox>
        <AuthButton>닉네임 설정</AuthButton>
        <FindPasswordButtonContainer>
          <FindPasswordButton>랜덤 닉네임 설정하기</FindPasswordButton>
        </FindPasswordButtonContainer>
      </form>
    </AuthTemplate>
  );
};

export default WelcomeForm;

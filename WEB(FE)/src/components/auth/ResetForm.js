import styled from "styled-components";
import {
  AuthButton,
  FindPasswordButton,
  FindPasswordButtonContainer,
} from "../common/Buttons";
import { AuthInputBox } from "../common/InputBox";
import AuthTemplate from "./AuthTemplate";

const Block1 = styled.div`
  margin: 35px 0px 35px 0px;
`;

const ResetForm = () => {
  return (
    <div>
      <div>비밀번호 재설정 페이지</div>
      <div></div>
      <AuthTemplate>
        <Block1></Block1>
        <AuthInputBox></AuthInputBox>
        <AuthButton>비밀번호 재설정하기</AuthButton>
        <FindPasswordButtonContainer>
          <FindPasswordButton toLink="/">처음으로</FindPasswordButton>
        </FindPasswordButtonContainer>
      </AuthTemplate>
    </div>
  );
};

export default ResetForm;

import AuthTemplate from "./AuthTemplate";
import { AuthInputBox } from "../common/InputBox";
import {
  AuthButton,
  AuthErrorButton,
  FindPasswordButton,
  FindPasswordButtonsContainer,
} from "../common/Buttons";
import styled from "styled-components";

const Block1 = styled.div`
  margin: 35px 0px 35px 0px;
`;

const LoginForm = ({
  onSubmit,
  email,
  password,
  onChange,
  loginErrorInfo
}) => {
  return (
    <AuthTemplate>
      <Block1></Block1>
      <form onSubmit={onSubmit}>
        <AuthInputBox
          name="email"
          type="email"
          placeholder="이메일"
          value={email}
          onChange={onChange}
          required
          error = {loginErrorInfo.isErr}
          autoFocus
        ></AuthInputBox>
        <AuthInputBox
          name="password"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={onChange}
          required
        ></AuthInputBox>
        {loginErrorInfo.isErr?<AuthErrorButton>{loginErrorInfo.errMsg}</AuthErrorButton>:<AuthButton>로그인하기</AuthButton>}
        <FindPasswordButtonsContainer>
          <FindPasswordButton toLink="/">처음으로</FindPasswordButton>
          <FindPasswordButton toLink="/reset">
            비밀번호 재설정
          </FindPasswordButton>
        </FindPasswordButtonsContainer>
      </form>
    </AuthTemplate>
  );
};

export default LoginForm;

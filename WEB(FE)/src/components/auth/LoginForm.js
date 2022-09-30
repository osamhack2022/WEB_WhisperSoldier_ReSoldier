import AuthTemplate from "./AuthTemplate";
import { AuthInputBox } from "../common/InputBox";
import {
  AuthButton,
  AuthErrorButton,
  AuthLoadingButton,
  FindPasswordButton,
  FindPasswordButtonsContainer,
} from "../common/Buttons";
import styled from "styled-components";
import { FirstComment } from "../common/Logos";

const Block1 = styled.div`
  margin: 35px 0px 35px 0px;
`;

const LoginForm = ({ onSubmit, email, password, onChange, loginErrorInfo }) => {
  return (
    <AuthTemplate>
      <FirstComment>어서와요!</FirstComment>
      <Block1></Block1>
      <form onSubmit={onSubmit}>
        <AuthInputBox
          name="email"
          type="email"
          placeholder="이메일"
          value={email}
          onChange={onChange}
          required
          error={loginErrorInfo.isErr}
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
        {loginErrorInfo.isErr ? (
          <AuthErrorButton>{loginErrorInfo.errMsg}</AuthErrorButton>
        ) : loginErrorInfo.isLoading ? (
          <AuthLoadingButton>잠시만 기다려주세요</AuthLoadingButton>
        ) : (
          <AuthButton>로그인하기</AuthButton>
        )}
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

import styled from "styled-components";
import {
  AuthButton,
  AuthErrorButton,
  AuthLoadingButton,
  FindPasswordButton,
  FindPasswordButtonContainer,
} from "../common/Buttons";
import { AuthInputBox } from "../common/InputBox";
import { FirstComment } from "../common/Logos";
import AuthTemplate from "./AuthTemplate";

const Block1 = styled.div`
  margin: 15px 0px 15px 0px;
`;

const SignUpForm = ({
  onSubmit,
  email,
  password,
  rePassword,
  onChange,
  signUpErrorInfo,
}) => {
  return (
    <AuthTemplate>
      <FirstComment>환영합니다!</FirstComment>
      <Block1></Block1>
      <form onSubmit={onSubmit}>
        <AuthInputBox
          name="email"
          type="email"
          placeholder="이메일"
          value={email}
          onChange={onChange}
          required
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
        <AuthInputBox
          name="rePassword"
          type="password"
          placeholder="비밀번호 재입력"
          value={rePassword}
          onChange={onChange}
          required
        ></AuthInputBox>
        {signUpErrorInfo.isErr ? (
          <AuthErrorButton>{signUpErrorInfo.errMsg}</AuthErrorButton>
        ) : signUpErrorInfo.isLoading ? (
          <AuthLoadingButton>잠시만 기다려주세요</AuthLoadingButton>
        ) : (
          <AuthButton>회원가입 하기</AuthButton>
        )}
        <FindPasswordButtonContainer>
          <FindPasswordButton toLink="/">처음으로</FindPasswordButton>
        </FindPasswordButtonContainer>
      </form>
    </AuthTemplate>
  );
};

export default SignUpForm;

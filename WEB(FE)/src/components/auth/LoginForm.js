import { Link } from "react-router-dom";
import AuthTemplate from "./AuthTemplate";
import { AuthInputBox } from "../common/InputBox";
import {
  AuthButton,
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
  notFoundErr,
  isError,
  errorMsg,
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
        <AuthButton>로그인하기</AuthButton>
        <div hidden={!isError}>{errorMsg}</div>
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

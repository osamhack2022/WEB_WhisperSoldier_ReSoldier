import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  AuthButton,
  FindPasswordButton,
  FindPasswordButtonContainer,
} from "../common/Buttons";
import { AuthInputBox } from "../common/InputBox";
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
  isErr,
  errMsg,
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
        <AuthInputBox
          name="rePassword"
          type="password"
          placeholder="비밀번호 재입력"
          value={rePassword}
          onChange={onChange}
          required
        ></AuthInputBox>
        <AuthButton>회원가입 하기</AuthButton>
        <br />
        <div hidden={!isErr}>{errMsg}</div>
        <FindPasswordButtonContainer>
          <FindPasswordButton toLink="/">처음으로</FindPasswordButton>
        </FindPasswordButtonContainer>
      </form>
    </AuthTemplate>
  );
};

export default SignUpForm;

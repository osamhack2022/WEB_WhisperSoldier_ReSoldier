import { Link } from "react-router-dom";
import AuthTemplate from "./AuthTemplate";
import { AuthInputBox } from "../common/InputBox";
import { AuthButton } from "../common/Buttons";
import styled from "styled-components";

const Block1 = styled.div`
  margin: 35px 0px 35px 0px;
`;

const LoginForm = ({ onSubmit, email, password, onChange, notFoundErr }) => {
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
        ></AuthInputBox>
        <br />
        <AuthInputBox
          name="password"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={onChange}
          required
        ></AuthInputBox>
        <br />
        <AuthButton>로그인하기</AuthButton>
        <br />
        <div hidden={!notFoundErr}>아이디 또는 비밀번호가 잘못되었습니다.</div>
        <br />
        <Link to="/">돌아가기</Link>
      </form>
    </AuthTemplate>
  );
};

export default LoginForm;

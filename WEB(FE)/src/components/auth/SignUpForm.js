import { Link } from "react-router-dom";
import { AuthButton } from "../common/Buttons";
import { AuthInputBox } from "../common/InputBox";
import AuthTemplate from "./AuthTemplate";

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
      <form onSubmit={onSubmit}>
        <AuthInputBox
          name="email"
          type="email"
          placeholder="이메일"
          value={email}
          onChange={onChange}
          required
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
        <br />
        <Link to="/">돌아가기</Link>
      </form>
    </AuthTemplate>
  );
};

export default SignUpForm;

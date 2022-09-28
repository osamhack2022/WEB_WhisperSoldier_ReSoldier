import { Link } from "react-router-dom";
import AuthTemplate from "./AuthTemplate";
import { AuthInputBox } from "../common/InputBox";

const LoginForm = ({ onSubmit, email, password, onChange, notFoundErr }) => {
  return (
    <AuthTemplate>
      <form onSubmit={onSubmit}>
        <AuthInputBox
          name="email"
          type="email"
          placeholder="이메일"
          value={email}
          onChange={onChange}
        ></AuthInputBox>
        <br />
        <AuthInputBox
          name="password"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={onChange}
        ></AuthInputBox>
        <br />
        <button>로그인하기</button>
        <br />
        <div hidden={!notFoundErr}>아이디 또는 비밀번호가 잘못되었습니다.</div>
        <br />
        <Link to="/">돌아가기</Link>
      </form>
    </AuthTemplate>
  );
};

export default LoginForm;

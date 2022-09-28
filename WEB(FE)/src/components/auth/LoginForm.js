import { Link } from "react-router-dom";

const LoginForm = ({ onSubmit, email, password, onChange, notFoundErr }) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        name="email"
        type="email"
        placeholder="이메일"
        value={email}
        onChange={onChange}
      />
      <br />
      <input
        name="password"
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={onChange}
      />
      <br />
      <button>로그인하기</button>
      <br />
      <div hidden={!notFoundErr}>아이디 또는 비밀번호가 잘못되었습니다.</div>
      <br />
      <Link to="/">돌아가기</Link>
    </form>
  );
};

export default LoginForm;

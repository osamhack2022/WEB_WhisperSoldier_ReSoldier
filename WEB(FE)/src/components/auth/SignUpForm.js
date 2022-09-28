import { Link } from "react-router-dom";

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
    <form onSubmit={onSubmit}>
      <input
        name="email"
        type="email"
        placeholder="이메일"
        value={email}
        onChange={onChange}
      />
      <input
        name="password"
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={onChange}
      />
      <input
        name="rePassword"
        type="password"
        placeholder="비밀번호 재입력"
        value={rePassword}
        onChange={onChange}
      />
      <button>회원가입 하기</button>
      <br />
      <div hidden={!isErr}>{errMsg}</div>
      <br />
      <Link to="/">돌아가기</Link>
    </form>
  );
};

export default SignUpForm;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { authService } from "../lib/fbase";
import LoginForm from "../components/auth/LoginForm";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notFoundErr, setNotFoundErr] = useState(false);

  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [emailChecked, setEmailChecked] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    /*firebase 연동 부분*/
    try {
      //const auth = getAuth();
      const data = await signInWithEmailAndPassword(
        authService,
        email,
        password
      );
      console.log(data);
      if (authService.currentUser.emailVerified === false) {
        setEmailChecked(false);
        setIsError(true);
        setErrorMsg(
          "이메일이 인증되지 않았습니다. 회원가입 페이지에서 이메일을 인증하시고 다시 찾아오세요."
        );
        // SignupPage로 가도록 한 후 거기서 인증 수행 (아직 로그아웃되지 않음)
      } else {
        setEmailChecked(true);
        console.log("이메일 인증 완료된 계정입니다.");

        navigate("/");
      }
    } catch (e) {
      setIsError(true);
      switch (e.code) {
        case "auth/wrong-password":
          setErrorMsg("아이디 또는 비밀번호가 잘못되었습니다.");
          break;
        case "auth/user-not-found":
          setErrorMsg("존재하지 않는 사용자입니다.");
          break;
        default:
          setErrorMsg("잠시 후에 다시 시도해주세요.");
      }
      console.log(e.code);
      console.log(e.message);
    }
  };

  return (
    <div>
      <div>로그인 페이지</div>
      <LoginForm
        onSubmit={onSubmit}
        onChange={onChange}
        email={email}
        password={password}
        notFoundErr={notFoundErr}
        isError={isError}
        errorMsg={errorMsg}
      ></LoginForm>
    </div>
  );
};

export default LoginPage;

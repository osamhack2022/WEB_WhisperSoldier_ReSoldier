import { useNavigate } from "react-router-dom";
import {
  browserSessionPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { authService } from "../lib/FAuth";
import LoginForm from "../components/auth/LoginForm";
import { useForm } from "../modules/useForm";
// import { useSetRecoilState } from "recoil";
// import { UserInfo } from "../store/AuthStore";
import { useState } from "react";

const LoginPage = () => {
  const [state, onChange] = useForm({
    email: "",
    password: "",
  });
  //const setUserInfo = useSetRecoilState(UserInfo);
  const [loginErrorInfo, setLoginErrorInfo] = useState({
    isErr: false,
    isEmailError: false,
    errMsg: "",
    isLoading: false,
  });

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoginErrorInfo((prev) => ({ ...prev, isLoading: true }));

    try {
      authService.setPersistence(browserSessionPersistence).then((res) => {});

      await signInWithEmailAndPassword(
        authService,
        state.email,
        state.password
      );

      const {
        currentUser: { emailVerified },
      } = authService;
      console.log(emailVerified);
      if (authService.currentUser.emailVerified === false) {
        setLoginErrorInfo((prev) => ({
          ...prev,
          isEmailError: true,
          errMsg: "이메일 인증이 안된 계정입니다",
        }));
        await signOut(authService);
        setTimeout(() => {
          setLoginErrorInfo((prev) => ({
            ...prev,
            isLoading: false,
            isEmailError: false,
          }));
        }, 3000);
      } else {
        console.log("[LoginPage.js] : 로그인 정상]");
        console.log(authService);
        if (authService.currentUser.displayName === null) {
          navigate("/welcome", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
        //setUserInfo((prev) => ({ ...prev, emailChecked: true, isLogin: true }));
      }
    } catch (e) {
      switch (e.code) {
        case "auth/wrong-password":
          setLoginErrorInfo((prev) => ({
            ...prev,
            isErr: true,
            isLoading: false,
            errMsg: "아이디 또는 비밀번호가 잘못되었습니다",
          }));
          break;
        case "auth/user-not-found":
          setLoginErrorInfo((prev) => ({
            ...prev,
            isEmailError: true,
            isLoading: false,
            errMsg: "존재하지 않은 계정입니다",
          }));
          break;
        default:
          setLoginErrorInfo((prev) => ({
            ...prev,
            isErr: true,
            isLoading: false,
            errMsg: "잠시후에 다시 시도해주세요",
          }));
      }
      console.log(e.code);
      console.log(e.message);

      setTimeout(() => {
        setLoginErrorInfo((prev) => ({
          ...prev,
          isEmailError: false,
          isErr: false,
        }));
      }, 3000);
    }
  };

  return (
    <div>
      <LoginForm
        onSubmit={onSubmit}
        onChange={onChange}
        email={state.email}
        password={state.password}
        loginErrorInfo={loginErrorInfo}
      ></LoginForm>
    </div>
  );
};

export default LoginPage;

import { useNavigate } from "react-router-dom";
import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { authService } from "../lib/FAuth";
import LoginForm from "../components/auth/LoginForm";
import {useForm} from "../modules/useForm";
import { useRecoilState, useSetRecoilState } from "recoil";
import { UserInfo } from "../store/AuthStore";
import { useState } from "react";

const LoginPage = () => {
  const [state, onChange] = useForm({
    email: "",
    password: "",
  });
  //const [userInfo, setUserInfo] = useRecoilState(UserInfo);
  const setUserInfo = useSetRecoilState(UserInfo);
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
      const auth = authService;
      auth.setPersistence(browserSessionPersistence).then((res) => {});
      //.then(() => {});
      /*
      setPersistence(auth, browserSessionPersistence)
        .then(() => {
          // Existing and future Auth states are now persisted in the current
          // session only. Closing the window would clear any existing state even
          // if a user forgets to sign out.
          // ...
          // New sign-in will be persisted with session persistence.
          return signInWithEmailAndPassword(auth, state.email, state.password);
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
        });*/

      const data = await signInWithEmailAndPassword(
        auth,
        state.email,
        state.password
      );

      //console.log(data);
      console.log(authService);
      console.log(authService.currentUser);
      console.log(authService.currentUser.emailVerified);
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
        console.log(auth);
        setUserInfo((prev) => ({ ...prev, emailChecked: true, isLogin: true }));
        navigate("/");
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
      <div>로그인 페이지</div>
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

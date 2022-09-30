import { useState } from "react";
import { authService } from "../lib/fbase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import SignUpForm from "../components/auth/SignUpForm";
import useForm from "../modules/useForm";
import { useRecoilState } from "recoil";
import { UserInfo } from "../store/AuthStore";
import EmailVerifiInfoForm from "../components/auth/EmailVerifiInfoForm";
import { regex } from "../lib/Const";

const SignupPage = () => {
  const [state, onChange] = useForm({
    email: "",
    password: "",
    rePassword: "",
  });
  const [userInfo, setUserInfo] = useRecoilState(UserInfo);
  const [signUpErrorInfo, setSignUpErrorInfo] = useState({
    isErr: false,
    isSuccess: false,
    errMsg: "",
    isLoading: false,
  });
  const emailFormat = regex;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (emailFormat.test(state.email) === false) {
      setSignUpErrorInfo((prev) => ({
        ...prev,
        isErr: true,
        errMsg: "이메일 형식이 옳지 않습니다",
      }));
      setTimeout(() => {
        setSignUpErrorInfo((prev) => ({ ...prev, isErr: false }));
      }, 3000);
    } else {
      /*firebase 연동 부분*/
      setSignUpErrorInfo((prev) => ({ ...prev, isLoading: true }));
      try {
        await createUserWithEmailAndPassword(
          authService,
          state.email,
          state.password
        );

        if (authService.currentUser.emailVerified === false) {
          setSignUpErrorInfo((prev) => ({
            ...prev,
            isLoading: false,
            isSuccess: true,
          }));
          sendEmailVerification(authService.currentUser)
            .then(console.log("이메일 인증 메일 발송!"))
            .catch((error) => {
              console.log(error);
              console.log(authService.currentUser);
            });
          await signOut(authService).then(() => {
            console.log("로그아웃 성공");
          });
          console.log(authService.currentUser);
          /*
          if (authService.currentUser) {
            setUserInfo((prev) => ({ ...prev, isLogin: true }));
          }*/
          /*await signOut(authService)
            .then(() => {
              console.log("로그아웃 성공");
            })*/
          //navigate("/");
        } else {
          console.log(
            "이미 인증된 계정입니다. 로그인으로 가서 로그인 해보세요"
          );
        }
      } catch (error) {
        switch (error.code) {
          case "auth/weak-password":
            setSignUpErrorInfo((prev) => ({
              ...prev,
              isLoading: false,
              isErr: true,
              errMsg: "비밀번호가 보안이 약합니다",
            }));
            break;
          case "auth/email-already-in-use":
            setSignUpErrorInfo((prev) => ({
              ...prev,
              isLoading: false,
              isErr: true,
              errMsg: "이미 가입된 계정입니다",
            }));
            break;

          default:
            // unknown error
            setSignUpErrorInfo((prev) => ({
              ...prev,
              isLoading: false,
              isErr: true,
              errMsg: "알 수 없는 오류 입니다. 다시 시도하세요",
            }));
            break;
        }

        console.log(error.code);
        console.log(error.message);

        setTimeout(() => {
          setSignUpErrorInfo((prev) => ({ ...prev, isErr: false }));
        }, 3000);
      }
    }
  };

  return (
    <div>
      <div>회원 가입 페이지</div>
      {signUpErrorInfo.isSuccess ? (
        <EmailVerifiInfoForm>환영합니다!</EmailVerifiInfoForm>
      ) : (
        <SignUpForm
          onSubmit={onSubmit}
          email={state.email}
          password={state.password}
          rePassword={state.rePassword}
          onChange={onChange}
          signUpErrorInfo={signUpErrorInfo}
        ></SignUpForm>
      )}
    </div>
  );
};

export default SignupPage;

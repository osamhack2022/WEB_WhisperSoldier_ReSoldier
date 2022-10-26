import { useState } from "react";
import { authService } from "../lib/FAuth";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import SignUpForm from "../components/auth/SignUpForm";
import { useForm } from "../modules/useForm";
import EmailVerifiInfoForm from "../components/auth/EmailVerifiInfoForm";
import { regex } from "../lib/Const";
import { Helmet } from "react-helmet-async";

const SignupPage = () => {
  const [state, onChange] = useForm({
    email: "",
    password: "",
    rePassword: "",
  });
  const [signUpErrorInfo, setSignUpErrorInfo] = useState({
    isErr: false,
    isEmailError: false,
    isPwError: false,
    isSuccess: false,
    errMsg: "",
    isLoading: false,
  });
  const emailFormat = regex;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (emailFormat.test(state.email) !== false) {
      setSignUpErrorInfo((prev) => ({
        ...prev,
        isEmailError: true,
        errMsg: "이메일 형식이 옳지 않습니다",
      }));
      setTimeout(() => {
        setSignUpErrorInfo((prev) => ({ ...prev, isEmailError: false }));
      }, 3000);
    } else if (state.password !== state.rePassword) {
      setSignUpErrorInfo((prev) => ({
        ...prev,
        errMsg: "입력한 비빌번호가 서로 다릅니다",
        isPwError: true,
      }));
      setTimeout(() => {
        setSignUpErrorInfo((prev) => ({ ...prev, isPwError: false }));
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
            .then()
            .catch((error) => {
              console.log(error);
            });
          await signOut(authService);
        }
      } catch (error) {
        switch (error.code) {
          case "auth/weak-password":
            setSignUpErrorInfo((prev) => ({
              ...prev,
              isLoading: false,
              isPwError: true,
              errMsg: "비밀번호가 보안이 약합니다",
            }));
            break;
          case "auth/email-already-in-use":
            setSignUpErrorInfo((prev) => ({
              ...prev,
              isLoading: false,
              isEmailError: true,
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

        // console.log(error.code);
        // console.log(error.message);

        setTimeout(() => {
          setSignUpErrorInfo((prev) => ({
            ...prev,
            isErr: false,
            isEmailError: false,
            isPwError: false,
          }));
        }, 3000);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>회원가입 - Whisper Soldier</title>
      </Helmet>
      {signUpErrorInfo.isSuccess ? (
        <EmailVerifiInfoForm>환영합니다!</EmailVerifiInfoForm>
      ) : (
        <SignUpForm
          onSubmit={onSubmit}
          state={state}
          onChange={onChange}
          signUpErrorInfo={signUpErrorInfo}
        ></SignUpForm>
      )}
    </>
  );
};

export default SignupPage;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const SignupPage = () => {
  const [state, onChange] = useForm({
    email: "",
    password: "",
    rePassword: "",
  });
  const [userInfo, setUserInfo] = useRecoilState(UserInfo);
  const [signUpErrorInfo, setSignUpErrorInfo] = useState({
    isErr: false,
    errMsg: "",
    isLoading: false,
  });

  //const [isErr, setIsErr] = useState(false);
  //const [errMsg, setErrMsg] = useState("");
  //const regex = new RegExp("d{13}@narasarang.or.kr");
  const regex = /^\d{13}@narasarang.or.kr$/;

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (regex.test(state.email) === false) {
      //if (regex.test(state.email) !== false) {
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
        //const auth = getAuth();
        const data = await createUserWithEmailAndPassword(
          authService,
          state.email,
          state.password
        );

        if (authService.currentUser.emailVerified === false) {
          //navigate("/register");
          sendEmailVerification(authService.currentUser)
            .then(
              console.log(
                "이메일 인증이 끝나면 로그인으로 돌아가서 다시 로그인해보세요."
              )
            )
            .catch((error) => {
              console.log(error);
              console.log(authService.currentUser);
            });
          console.log(authService.currentUser);
          if (authService.currentUser) {
            setUserInfo((prev) => ({ ...prev, isLogin: true }));
          }
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
            // weak password error
            setSignUpErrorInfo((prev) => ({
              ...prev,
              isLoading: false,
              isErr: true,
              errMsg: "비밀번호가 보안이 약합니다",
            }));
            break;
          case "auth/email-already-in-use":
            // already in use error
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
      // 이메일 유효성 검사                                   --완료!
      // isNarasarang state와 정규표현식 이용해서
      // {숫자 13자리 } + narasarang.or.kr로 검사하도록 하였음
      // /\d{13}@narasarang.co.kr/;
      // 아닐 시 회원가입 버튼 비활성화

      // 이메일 인증 절차
    }
  };

  return (
    <div>
      <div>회원 가입 페이지</div>
      {userInfo.isLogin ? (
        <EmailVerifiInfoForm></EmailVerifiInfoForm>
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

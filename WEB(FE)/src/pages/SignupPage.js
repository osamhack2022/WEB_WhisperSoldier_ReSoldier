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

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isErr, setIsErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [isNarasarang, setIsNarasarang] = useState(false);
  const regex = new RegExp("d{13}@narasarang.or.kr");

  const navigate = useNavigate();

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
      setIsNarasarang(regex.test(email));
      console.log(isNarasarang);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "rePassword") {
      setRePassword(value);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    setIsNarasarang(regex.test(email));
    if (isNarasarang === false) {
      setErrMsg("이메일 형식이 옳지 않습니다");
      setIsErr(true);
      setTimeout(() => {
        setIsErr(false);
      }, 3000);
    } else {
      /*firebase 연동 부분*/
      try {
        //const auth = getAuth();
        const data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
        if (authService.currentUser.emailVerified === false) {
          navigate("/register");
          alert(
            "다음으로 이메일 인증을 수행해야 합니다. 인증 메일을 발송합니다.\n이메일 인증이 끝나면 로그인으로 돌아가서 다시 로그인해보세요."
          );
          sendEmailVerification(authService.currentUser)
            .then(
              console.log(
                "이메일 인증이 끝나면 로그인으로 돌아가서 다시 로그인해보세요."
              )
            )
            .catch((error) => console.log(error));
          await signOut(authService)
            .then(() => {
              console.log("로그아웃 성공");
            })
            .catch((e) => console.log(e));
          navigate("/");
        } else {
          navigate("/");
        }
      } catch (error) {
        setIsErr(true);
        switch (error.code) {
          case "auth/weak-password":
            // weak password error
            setErrMsg("비밀번호가 보안이 약합니다");
            break;

          case "auth/email-already-in-use":
            // already in use error
            setErrMsg("이미 가입된 계정입니다");
            break;

          default:
            // unknown error
            setErrMsg("알 수 없는 오류 입니다. 다시 시도하세요");
            break;
        }

        console.log(error.code);
        console.log(error.message);
        setTimeout(() => {
          setIsErr(false);
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

  const naraOnClick = () => {
    if (authService.currentUser.emailVerified === false) {
      navigate("/register");
      alert("다음으로 이메일 인증을 수행해야 합니다. 인증 메일을 발송합니다.");
      sendEmailVerification(authService.currentUser)
        .then(
          console.log(
            "이메일 인증이 끝나면 로그인으로 돌아가서 로그인해보세요."
          )
        )
        .catch((error) => console.log(error));
    } else {
      console.log("이미 인증된 계정입니다.");
      navigate("/");
    }
  };

  return (
    <div>
      <div>회원 가입 페이지</div>
      <SignUpForm
        onSubmit={onSubmit}
        email={email}
        password={password}
        rePassword={rePassword}
        onChange={onChange}
        isErr={isErr}
        errMsg={errMsg}
      ></SignUpForm>
      <button hidden={!authService.currentUser} onClick={naraOnClick}>
        나라사랑메일 인증
      </button>
    </div>
  );
};

export default SignupPage;

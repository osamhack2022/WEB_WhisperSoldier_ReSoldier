import { useState } from "react";
import { Link } from "react-router-dom";
import { authService } from "../lib/fbase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import SignUpForm from "../components/auth/SignUpForm";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isErr, setIsErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [isNarasarang, setIsNarasarang] = useState(false);
  const regex = /\d{13}@narasarang.or.kr/;
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
      setIsNarasarang(regex.test(value));
      console.log(isNarasarang);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "rePassword") {
      setRePassword(value);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    /*firebase 연동 부분*/
    try {
      //const auth = getAuth();
      const data = await createUserWithEmailAndPassword(
        authService,
        email,
        password
      );
    } catch (error) {
      setIsErr(true);
      switch (error.code) {
        case "auth/weak-password":
          // weak password error
          setErrMsg("비밀번호가 보안이 약합니다.");
          break;

        case "auth/email-already-in-use":
          // already in use error
          setErrMsg("이미 가입된 계정입니다. 다른 계정으로 가입하세요.");
          break;

        default:
          // unknown error
          setErrMsg("다시 시도하세요.");
          break;
      }

      console.log(error.code);
      console.log(error.message);
    }
    // 이메일 유효성 검사                                   --완료!
    // isNarasarang state와 정규표현식 이용해서
    // {숫자 13자리 } + narasarang.or.kr로 검사하도록 하였음
    // /\d{13}@narasarang.co.kr/;
    // 아닐 시 회원가입 버튼 비활성화

    // 이메일 인증 절차
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
    </div>
  );
};

export default SignupPage;

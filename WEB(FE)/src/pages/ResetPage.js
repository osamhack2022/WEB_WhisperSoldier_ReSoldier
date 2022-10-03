import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { authService } from "../lib/FAuth";
import ResetForm from "../components/auth/ResetForm";
import { useForm } from "../modules/useForm";
import { regex } from "../lib/Const";
import ResetVerifiInfoForm from "../components/auth/ResetVerificationForm";

const ResetPage = () => {
  const [state, onChange] = useForm({
    email: "",
  });
  const [resetErrorInfo, setResetErrorInfo] = useState({
    isErr: false,
    isSucces: false,
    errMsg: "",
    isLoading: false,
  });

  const emailFormat = regex;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (emailFormat.test(state.email) === false) {
      setResetErrorInfo((prev) => ({
        ...prev,
        isErr: true,
        errMsg: "이메일 형식이 옳지 않습니다",
      }));
      setTimeout(() => {
        setResetErrorInfo((prev) => ({ ...prev, isErr: false }));
      }, 3000);
    } else {
      const auth = authService;
      setResetErrorInfo((prev) => ({ ...prev, isLoading: true }));
      sendPasswordResetEmail(auth, state.email)
        .then(() => {
          console.log("send email success");
          setResetErrorInfo((prev) => ({
            ...prev,
            isLoading: false,
            isSucces: true,
          }));
        })
        .catch((error) => {
          setResetErrorInfo((prev) => ({
            ...prev,
            isLoading: false,
            isErr: true,
          }));
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          if (errorCode === "auth/user-not-found") {
            setResetErrorInfo((prev) => ({
              ...prev,
              isLoading: false,
              isErr: true,
              errMsg: "존재하지 않은 계정입니다",
            }));
          } else {
            setResetErrorInfo((prev) => ({
              ...prev,
              isLoading: false,
              isErr: true,
              errMsg: "알 수 없는 오류입니다",
            }));
          }
          setTimeout(() => {
            setResetErrorInfo((prev) => ({ ...prev, isErr: false }));
          }, 3000);
          // ..
        });
    }
  };

  return (
    <div>
      {resetErrorInfo.isSucces ? (
        <ResetVerifiInfoForm>비밀번호 초기화</ResetVerifiInfoForm>
      ) : (
        <ResetForm
          onSubmit={onSubmit}
          email={state.email}
          onChange={onChange}
          resetErrorInfo={resetErrorInfo}
        ></ResetForm>
      )}
    </div>
  );
};

export default ResetPage;

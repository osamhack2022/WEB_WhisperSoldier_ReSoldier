import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { whisperSodlierSessionKey } from "../../lib/Const";
import { authService } from "../../lib/FAuth";
import { useForm } from "../../modules/useForm";
import { ChangeProfileImgButton, FunctionTitle } from "./ChangeProfile";

const ChangePasswordFormStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: fit-content;
  width: 320px;
`;

const FormText = styled.div`
  font-size: 16px;
  text-align: left;
  font-weight: 700;
`;

const AuthInputBox = styled.input`
  width: 280px;
  height: 36px;
  margin: 5px 0px;
  padding: 16px 27px 16px 27px;
  border-radius: 25px;
  border: ${(props) =>
    props.error ? "solid 1px #CD5C5c" : "1px solid rgb(189, 189, 189)"};
  background-color: #fff;
  transition: all 0.5s;
  animation: ${(props) => (props.error ? "vibration 0.1s 5" : "none")};

  @keyframes vibration {
    from {
      transform: rotate(0.5deg);
    }
    to {
      transform: rotate(-0.5deg);
    }
  }
`;

const ChangePasswordForm = () => {
  // const { uid: currentUserUid } = JSON.parse(
  const currentUserKey = JSON.parse(
    sessionStorage.getItem(whisperSodlierSessionKey)
  );

  //console.log(currentUserKey);

  const [passworInputValue, onChange] = useForm({
    current: "",
    new: "",
    checkNew: "",
  });
  const [loginErrorInfo, setLoginErrorInfo] = useState({
    isErr: false,
    isEmailError: false,
    errMsg: "",
    isLoading: false,
  });
  const onChangePassword = (e) => {
    e.preventDefault();
    //const auth = getAuth();
    signInWithEmailAndPassword(
      authService,
      currentUserKey.email,
      passworInputValue.current
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        if (passworInputValue.new === passworInputValue.checkNew) {
          const check = window.confirm("비밀번호를 바꾸시겠습니까?");
          if (check) {
            updatePassword(authService.currentUser, passworInputValue.new)
              .then(() => {
                alert("변경 성공");
              })
              .catch((error) => {
                alert("변경 실패: ", error);
              });
          }
        } else {
          alert("재입력한 비밀번호가 다릅니다.");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);

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
      });
    //체크하는 로직
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(authService, (user) => {
      unsub();
      if (user) {
        const nowUser = authService.currentUser;
      } else {
        // not logged in
      }
    });
  }, []);

  return (
    <ChangePasswordFormStyle>
      <form>
        <AuthInputBox
          type="text"
          name="current"
          placeholder="기존 비밀번호"
          value={passworInputValue.current}
          onChange={onChange}
        ></AuthInputBox>
        <AuthInputBox
          type="text"
          name="new"
          placeholder="새 비밀번호"
          value={passworInputValue.new}
          onChange={onChange}
        ></AuthInputBox>
        <AuthInputBox
          type="text"
          name="checkNew"
          placeholder="새 비밀번호 확인"
          value={passworInputValue.checkNew}
          onChange={onChange}
        ></AuthInputBox>
        <ChangeProfileImgButton type="submit" onClick={onChangePassword}>
          비밀번호 변경하기
        </ChangeProfileImgButton>
      </form>
    </ChangePasswordFormStyle>
  );
};

export default ChangePasswordForm;

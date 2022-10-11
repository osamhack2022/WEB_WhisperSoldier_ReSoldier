import { onAuthStateChanged, updatePassword } from "firebase/auth";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { whisperSodlierSessionKey } from "../../lib/Const";
import { authService } from "../../lib/FAuth";
import { useForm } from "../../modules/useForm";

const AuthInputBox = styled.input`
  width: 320px;
  height: 48px;
  margin: 10px 0 10px;
  padding: 16px 27px 16px 27px;
  border-radius: 25px;
  border: ${(props) => (props.error ? "solid 2px #CD5C5c" : "solid 2px #000")};
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
  const { uid: currentUserUid } = JSON.parse(
    sessionStorage.getItem(whisperSodlierSessionKey)
  );

  const [passworInputValue, onChange] = useForm({
    current: "",
    new: "",
    checkNew: "",
  });

  const onChangePassword = (e) => {
    e.preventDefault();
    //체크하는 로직
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
    <>
      <div>비번 바꾸기</div>
      <AuthInputBox
        type="text"
        name="current"
        placeholder="기존 비밀번호"
        value={passworInputValue.current}
        onChange={onChange}
      ></AuthInputBox>
      <form>
        <AuthInputBox
          type="text"
          name="new"
          placeholder="새로운 비밀번호"
          value={passworInputValue.new}
          onChange={onChange}
        ></AuthInputBox>
        <AuthInputBox
          type="text"
          name="checkNewPW"
          placeholder="비밀번호 재확인"
          value={passworInputValue.checkNew}
          onChange={onChange}
        ></AuthInputBox>
        <button type="submit" onClick={onChangePassword}>
          변경
        </button>
      </form>
    </>
  );
};

export default ChangePasswordForm;

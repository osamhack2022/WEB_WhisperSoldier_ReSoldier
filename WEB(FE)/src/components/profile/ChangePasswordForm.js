import { Dialog, DialogActions } from "@mui/material";
import { signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import { useState } from "react";
import styled from "styled-components";
import { whisperSodlierSessionKey } from "../../lib/Const";
import { authService } from "../../lib/FAuth";
import media from "../../modules/MediaQuery";
import { useAndSetForm } from "../../modules/useForm";
import { WsDialogTitle } from "../../styles/profile/CheckDefaultProfileImgDialogStyle";
import {
  CancelButton,
  ConfirmButton,
} from "./CheckDefaultProfileImgNestDialog";

const ChangePasswordFormStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: fit-content;
  width: 320px;
  flex-wrap: no-wrap;
  ${media.tablet`
  width: 180px;
  `}
  ${media.mobile`
  flex-grow : 1;
  max-width : 280px;
  `}
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

  ${media.tablet`
  width: 180px;
  `}
  ${media.mobile`
  width : 80%;
  max-width : 280px;
  `}
`;

export const ChangePasswordButton = styled.button`
  margin: 10px 0px 5px 0px;
  position: relative;
  padding: 0px 20px;
  color: ${(props) => (props.error ? "#ffffff" : "#0d552c")};
  height: 30px;
  width: ${(props) => (props.error ? "200px" : "100px")};
  background-color: ${(props) =>
    props.error ? "#a65646" : "rgba(0, 0, 0, 0)"};
  font-weight: 500;
  font-size: 11px;
  text-align: center;
  text-decoration: none;
  border-radius: 25px;
  margin-left: ${(props) => (props.isMarginLeft ? "10px" : "0px")};
  cursor: ${(props) => (props.error ? "default" : "pointer")};
  border: ${(props) =>
    props.error ? "1px solid rgb(166, 86, 70)" : "1px solid rgb(26, 117, 65)"};
  transition: all 0.5s;
  animation: ${(props) => (props.error ? "vibration 0.1s 5" : "none")};
  white-space: nowrap;
  &:hover {
    background: ${(props) => (props.error ? "#a65646" : "#0d552c")};
    color: ${(props) => (props.error ? "#ffffff" : "#ffffff")};
  }
`;

const ChangePasswordForm = ({ setSuccessInfo }) => {
  const currentUserKey = JSON.parse(
    sessionStorage.getItem(whisperSodlierSessionKey)
  );

  const [passworInputValue, setPasswordInputValue, onChange] = useAndSetForm({
    current: "",
    new: "",
    checkNew: "",
  });
  const [passwordErrorInfo, setPasswordErrorInfo] = useState({
    isErr: false,
    errMsg: "",
    isCurrentPasswordErr: false,
    isNewPasswordErr: false,
    isLoading: false,
  });

  const [openDialogForChangePassword, setOpenDialogForChangePassword] =
    useState(false);
  const handleClickOpenDialogForChangePassword = async (e) => {
    e.preventDefault();
    if (passworInputValue.current.length > 0) {
      if (
        passworInputValue.new.length > 0 &&
        passworInputValue.checkNew.length > 0
      ) {
        if (passworInputValue.new === passworInputValue.checkNew) {
          setPasswordErrorInfo((prev) => ({
            ...prev,
            isLoading: true,
          }));
          signInWithEmailAndPassword(
            authService,
            currentUserKey.email,
            passworInputValue.current
          )
            .then((userCredential) => {
              setOpenDialogForChangePassword(true);
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorCode, errorMessage);

              switch (error.code) {
                case "auth/wrong-password":
                  setPasswordErrorInfo((prev) => ({
                    ...prev,
                    isErr: true,
                    isLoading: false,
                    isCurrentPasswordErr: true,
                    errMsg: "현재 비밀번호가 잘못되었습니다",
                  }));
                  break;
                default:
                  setPasswordErrorInfo((prev) => ({
                    ...prev,
                    isErr: true,
                    isLoading: false,
                    isCurrentPasswordErr: true,
                    isNewPasswordErr: true,
                    errMsg: "잠시후에 다시 시도해주세요",
                  }));
              }
              setTimeout(() => {
                setPasswordErrorInfo((prev) => ({
                  ...prev,
                  isErr: false,
                  isLoading: false,
                  isCurrentPasswordErr: false,
                  isNewPasswordErr: false,
                  errMsg: "",
                }));
                setPasswordInputValue((prev) => ({
                  ...prev,
                  current: "",
                  new: "",
                  checkNew: "",
                }));
              }, 3000);
            });
        } else {
          setPasswordErrorInfo((prev) => ({
            ...prev,
            isErr: true,
            isLoading: false,
            isNewPasswordErr: true,
            errMsg: "재입력한 비밀번호가 다릅니다",
          }));
          setTimeout(() => {
            setPasswordErrorInfo((prev) => ({
              ...prev,
              isErr: false,
              isLoading: false,
              isCurrentPasswordErr: false,
              isNewPasswordErr: false,
              errMsg: "",
            }));
            setPasswordInputValue((prev) => ({
              ...prev,
              current: "",
              new: "",
              checkNew: "",
            }));
          }, 3000);
        }
      } else {
        setPasswordErrorInfo((prev) => ({
          ...prev,
          isErr: true,
          isLoading: false,
          isNewPasswordErr: true,
          errMsg: "새로운 비밀번호를 입력해주세요",
        }));
        setTimeout(() => {
          setPasswordErrorInfo((prev) => ({
            ...prev,
            isErr: false,
            isLoading: false,
            isCurrentPasswordErr: false,
            isNewPasswordErr: false,
            errMsg: "",
          }));
          setPasswordInputValue((prev) => ({
            ...prev,
            current: "",
            new: "",
            checkNew: "",
          }));
        }, 3000);
      }
    } else {
      setPasswordErrorInfo((prev) => ({
        ...prev,
        isErr: true,
        isLoading: false,
        isCurrentPasswordErr: true,
        errMsg: "현재 비밀번호를 입력해주세요",
      }));
      setTimeout(() => {
        setPasswordErrorInfo((prev) => ({
          ...prev,
          isErr: false,
          isLoading: false,
          isCurrentPasswordErr: false,
          isNewPasswordErr: false,
          errMsg: "",
        }));
        setPasswordInputValue((prev) => ({
          ...prev,
          current: "",
          new: "",
          checkNew: "",
        }));
      }, 3000);
    }
  };

  const handleCloseDialogForChangePassword = async () => {
    setOpenDialogForChangePassword(false);
  };

  const onChangePassword = async () => {
    await updatePassword(authService.currentUser, passworInputValue.new)
      .then(() => {
        setSuccessInfo((prev) => ({
          ...prev,
          password: true,
        }));
        setPasswordInputValue((prev) => ({
          ...prev,
          current: "",
          new: "",
          checkNew: "",
        }));
        setTimeout(() => {
          setSuccessInfo((prev) => ({ ...prev, password: false }));
        }, 3000);
      })
      .catch((error) => {
        setSuccessInfo((prev) => ({
          ...prev,
          errorPassword: true,
        }));
        setPasswordInputValue((prev) => ({
          ...prev,
          current: "",
          new: "",
          checkNew: "",
        }));
        setTimeout(() => {
          setSuccessInfo((prev) => ({ ...prev, errorPassword: false }));
        }, 3000);
      });

    setOpenDialogForChangePassword(false);
  };

  return (
    <ChangePasswordFormStyle>
      <form>
        <AuthInputBox
          type="password"
          name="current"
          placeholder="현재 비밀번호"
          value={passworInputValue.current}
          onChange={onChange}
          error={passwordErrorInfo.isCurrentPasswordErr}
          required
        ></AuthInputBox>
        <AuthInputBox
          type="password"
          name="new"
          placeholder="새 비밀번호"
          value={passworInputValue.new}
          onChange={onChange}
          error={passwordErrorInfo.isNewPasswordErr}
          required
        ></AuthInputBox>
        <AuthInputBox
          type="password"
          name="checkNew"
          placeholder="새 비밀번호 확인"
          value={passworInputValue.checkNew}
          onChange={onChange}
          error={passwordErrorInfo.isNewPasswordErr}
          required
        ></AuthInputBox>
        <ChangePasswordButton
          type="submit"
          onClick={handleClickOpenDialogForChangePassword}
          error={passwordErrorInfo.isErr}
        >
          {passwordErrorInfo.isErr ? passwordErrorInfo.errMsg : "비밀번호 변경"}
        </ChangePasswordButton>

        <Dialog
          open={openDialogForChangePassword}
          onClose={handleCloseDialogForChangePassword}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <WsDialogTitle>비밀번호를 변경하시겠습니까?</WsDialogTitle>
          <DialogActions>
            <CancelButton
              onClick={handleCloseDialogForChangePassword}
              color="primary"
              autoFocus
            >
              취소
            </CancelButton>
            <ConfirmButton color="primary" onClick={onChangePassword}>
              변경
            </ConfirmButton>
          </DialogActions>
        </Dialog>
      </form>
    </ChangePasswordFormStyle>
  );
};

export default ChangePasswordForm;

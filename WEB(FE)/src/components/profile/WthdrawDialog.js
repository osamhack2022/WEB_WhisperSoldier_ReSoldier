import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { styled } from "@mui/system";
import { deleteUser, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminSessionKey } from "../../lib/Const";
import { authService } from "../../lib/FAuth";
import {
  dbFunction,
  dbService,
  storageFunction,
  storageService,
} from "../../lib/FStore";
import { useForm } from "../../modules/useForm";
import { WsDialogTitle } from "../../styles/profile/CheckDefaultProfileImgDialogStyle";
import { PasswordInputBox } from "../../styles/profile/WthdrawDialogStyle";

const OnWthdrawDialogStyle = styled(Dialog)({
  display: "flex",
  justifyContent: "center",
  alignItems: "Center",
});

const OnWthdrawButton = styled(Button)({
  margin: "5px 0px 0px 0px",
  position: "relative",
  padding: "1px 8px",
  color: "#A65646",
  height: "31px",
  width: "100px",
  backgroundColor: "rgba(0, 0, 0, 0)",
  fontFamily: "IBM Plex Sans KR, sans-serif",
  fontWeight: "500",
  fontSize: "11px",
  textAlign: "center",
  textDecoration: "none",
  borderRadius: "25px",
  border: "1px solid #A65646",
  "&:hover": {
    background: "#A65646",
    color: "#ffffff",
  },
});

const ConfirmButton = styled(Button)({
  color: "#0d552c",
  fontFamily: "IBM Plex Sans KR, sans-serif",
  fontWeight: "400",
  fontSize: "14px",
  textAlign: "center",
  "&:hover": {
    background: "#0d552c",
    color: "#ffffff",
  },
});

const CancelButton = styled(Button)({
  color: "#a65646",
  fontFamily: "IBM Plex Sans KR, sans-serif",
  fontWeight: "400",
  fontSize: "14px",
  textAlign: "center",
  "&:hover": {
    background: "#a65646",
    color: "#ffffff",
  },
});

const ErrorButton = styled(Button)({
  color: "#a65646",
  fontFamily: "IBM Plex Sans KR, sans-serif",
  fontWeight: "400",
  fontSize: "14px",
  textAlign: "center",
  cursur: "none",
  "&:hover": {
    background: "#a65646",
    color: "#ffffff",
  },
});

const WthdrawConfirmDialog = ({
  myProfileImg,
  passwordValue,
  setErrorPassword,
}) => {
  const navigate = useNavigate();
  const { ref, deleteObject } = storageFunction;
  const { doc, deleteDoc } = dbFunction;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const CheckPassword = () => {
    if (passwordValue.length > 0) {
      signInWithEmailAndPassword(
        authService,
        authService.currentUser.email,
        passwordValue
      )
        .then((userCredential) => {
          handleClickOpen();
        })
        .catch((error) => {
          console.log(error);
          setErrorPassword((prev) => ({
            ...prev,
            state: true,
            msg: "비밀번호가 잘못되었습니다",
          }));
          setTimeout(() => {
            setErrorPassword((prev) => ({
              ...prev,
              state: false,
              msg: "",
            }));
          }, 3000);
        });
    } else {
      setErrorPassword((prev) => ({
        ...prev,
        state: true,
        msg: "비밀번호를 입력해주세요",
      }));
      setTimeout(() => {
        setErrorPassword((prev) => ({
          ...prev,
          state: false,
          msg: "",
        }));
      }, 3000);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onWthdraw = async (e) => {
    e.preventDefault();
    deleteDoc(doc(dbService, "User", authService.currentUser.uid));
    if (myProfileImg) {
      deleteObject(ref(storageService, myProfileImg));
    }
    await deleteUser(authService.currentUser)
      .then(() => {
        setOpen(false);
        sessionStorage.removeItem(adminSessionKey);
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.log(error);
        setOpen(false);
      });
  };

  return (
    <>
      <CancelButton onClick={CheckPassword}>탈퇴하기</CancelButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <WsDialogTitle>위스퍼솔져를 탈퇴하시겠습니까?</WsDialogTitle>

        <DialogActions>
          <ConfirmButton onClick={handleClose} color="primary" autoFocus>
            취소
          </ConfirmButton>
          <CancelButton onClick={onWthdraw} color="primary">
            탈퇴
          </CancelButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

const WthdrawDialog = ({ myProfileImg }) => {
  const [inputValue, onChange] = useForm({ password: "" });
  const [errorPassword, setErrorPassword] = useState({ state: false, msg: "" });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <OnWthdrawButton onClick={handleClickOpen}>탈퇴하기</OnWthdrawButton>
      <OnWthdrawDialogStyle
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <WsDialogTitle>
          계정 비밀번호를 입력하고 탈퇴하기 버튼을 눌러주세요
        </WsDialogTitle>
        <PasswordInputBox
          type="password"
          name="password"
          placeholder="비밀번호"
          value={inputValue.password}
          onChange={onChange}
          required
        ></PasswordInputBox>

        <DialogActions>
          <ConfirmButton onClick={handleClose} color="primary" autoFocus>
            취소
          </ConfirmButton>
          {errorPassword.state ? (
            <ErrorButton>{errorPassword.msg}</ErrorButton>
          ) : (
            <WthdrawConfirmDialog
              passwordValue={inputValue.password}
              myProfileImg={myProfileImg}
              setErrorPassword={setErrorPassword}
            ></WthdrawConfirmDialog>
          )}
        </DialogActions>
      </OnWthdrawDialogStyle>
    </>
  );
};

export default WthdrawDialog;

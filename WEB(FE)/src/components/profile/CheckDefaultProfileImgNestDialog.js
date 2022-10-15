import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { useState } from "react";
import { styled } from "@mui/system";
import { WsDialogTitle } from "../../styles/profile/CheckDefaultProfileImgDialogStyle";
import { authService } from "../../lib/FAuth";
import { updateProfile } from "firebase/auth";

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

const CheckDefaultProfileImgDialog = ({
  setProfileImg,
  setMyProfileImg,
  isOuterOpen,
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onComfirmChangeDefaultProfileImg = () => {
    setOpen(false);
    setProfileImg("");
    setMyProfileImg("");
    isOuterOpen(false);

    updateProfile(authService.currentUser, {
      photoURL: "",
    })
      .then(() => {
        // Profile updated!
        // ...
        console.log("프로필 사진 변경 성공");
        // alert("닉네임 변경을 성공했습니다.");

        setOpen(false);
      })
      .catch((error) => {
        // An error occurred
        // ...
        console.log(error);
      });
  };
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        기본 프로필 사진으로 설정하기
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <WsDialogTitle>기본 프로필 사진으로 변경하시겠습니까?</WsDialogTitle>

        <DialogActions>
          <CancelButton onClick={handleClose} color="primary">
            취소
          </CancelButton>
          <ConfirmButton
            onClick={onComfirmChangeDefaultProfileImg}
            color="primary"
            autoFocus
          >
            변경
          </ConfirmButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CheckDefaultProfileImgDialog;

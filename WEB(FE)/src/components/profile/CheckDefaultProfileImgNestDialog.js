import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { useState } from "react";
import { styled } from "@mui/system";
import { WsDialogTitle } from "../../styles/profile/CheckDefaultProfileImgDialogStyle";
import { authService } from "../../lib/FAuth";
import { updateProfile } from "firebase/auth";
import {
  dbFunction,
  dbService,
  storageFunction,
  storageService,
} from "../../lib/FStore";
import { SetDefaultProfileImgButton } from "../../styles/profile/ChangeProfileStyle";
import { whisperSodlierSessionKey } from "../../lib/Const";
import { updateDoc } from "firebase/firestore";

export const ConfirmButton = styled(Button)({
  color: "#0d552c",
  fontFamily: "IBM Plex Sans KR, sans-serif",
  fontWeight: "500",
  fontSize: "14px",
  textAlign: "center",
  "&:hover": {
    background: "#0d552c",
    color: "#ffffff",
  },
});

export const CancelButton = styled(Button)({
  color: "#a65646",
  fontFamily: "IBM Plex Sans KR, sans-serif",
  fontWeight: "500",
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
  myProfileImg,
  setSuccessInfo,
}) => {
  const [open, setOpen] = useState(false);
  const { ref, deleteObject } = storageFunction;
  const { doc } = dbFunction;

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
        if (myProfileImg) {
          deleteObject(ref(storageService, myProfileImg));
        }
        updateDoc(
          doc(
            dbService,
            "User",
            JSON.parse(sessionStorage.getItem(whisperSodlierSessionKey)).uid
          ),
          { profileImg: "" }
        );

        setOpen(false);

        setSuccessInfo((prev) => ({ ...prev, defaultProfileImg: true }));
        setTimeout(() => {
          setSuccessInfo((prev) => ({ ...prev, defaultProfileImg: false }));
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <SetDefaultProfileImgButton onClick={handleClickOpen}>
        기본 프로필 사진으로 설정하기
      </SetDefaultProfileImgButton>
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

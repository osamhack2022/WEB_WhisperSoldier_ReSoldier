import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { useState } from "react";
import { styled } from "@mui/system";
import { WsDialogTitle } from "../../styles/profile/CheckDefaultProfileImgDialogStyle";

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

const CheckDefaultProfileImgDialog = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          <ConfirmButton onClick={handleClose} color="primary" autoFocus>
            변경
          </ConfirmButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CheckDefaultProfileImgDialog;

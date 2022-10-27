import { Dialog, DialogActions } from "@mui/material";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminSessionKey } from "../../lib/Const";
import { authService } from "../../lib/FAuth";
import { WsDialogTitle } from "../../styles/profile/CheckDefaultProfileImgDialogStyle";
import { PrimaryMenuButton } from "../../styles/profile/ProfilePageStyle";
import {
  CancelButton,
  ConfirmButton,
} from "./CheckDefaultProfileImgNestDialog";

const Logout = () => {
  const navigate = useNavigate();

  const [openDialogForLogout, setOpenDialogForLogout] = useState(false);

  const handleClickOpenDialogForLogout = () => {
    setOpenDialogForLogout(true);
  };

  const handleCloseDialogForLogout = () => {
    setOpenDialogForLogout(false);
  };

  const onLogout = async () => {
    await signOut(authService);
    sessionStorage.removeItem(adminSessionKey);
    navigate("/", { replace: true });
    // window.location.reload();
  };
  return (
    <>
      <PrimaryMenuButton
        onClick={handleClickOpenDialogForLogout}
        bottom={true}
        logout={true}
      >
        로그아웃
      </PrimaryMenuButton>
      <Dialog
        open={openDialogForLogout}
        onClose={handleCloseDialogForLogout}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <WsDialogTitle>로그아웃 하시겠습니까?</WsDialogTitle>
        <DialogActions>
          <CancelButton
            onClick={handleCloseDialogForLogout}
            color="primary"
            autoFocus
          >
            취소
          </CancelButton>
          <ConfirmButton color="primary" onClick={onLogout}>
            로그아웃
          </ConfirmButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Logout;

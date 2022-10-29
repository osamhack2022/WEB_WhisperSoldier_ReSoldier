import { Dialog, DialogActions } from "@mui/material";
import { updateProfile } from "firebase/auth";
import { useState } from "react";
import { whisperSodlierSessionKey } from "../../lib/Const";
import { authService } from "../../lib/FAuth";
import { dbFunction, dbService } from "../../lib/FStore";
import { ChangeProfileImgButton } from "../../styles/profile/ChangeProfileStyle";
import { WsDialogTitle } from "../../styles/profile/CheckDefaultProfileImgDialogStyle";
import {
  CancelButton,
  ConfirmButton,
} from "./CheckDefaultProfileImgNestDialog";

const ChangeNickname = ({
  currentNickname,
  errMeg,
  setErrMsg,
  errProfileInfo,
  setErrProfileInfo,
  setUserName,
  setSuccessInfo,
}) => {
  const { doc, getDocs, query, collection, where, updateDoc } = dbFunction;
  const [openDialogForChangeNickname, setOpenDialogForChangeNickname] =
    useState(false);
  const handleClickOpenDialogForChangeNickname = async () => {
    if (currentNickname.nickname.length !== 0) {
      if (
        currentNickname.nickname !==
        JSON.parse(sessionStorage.getItem(whisperSodlierSessionKey))
          .providerData[0].displayName
      ) {
        const nicknameSearchQuery = query(
          collection(dbService, "User"),
          where("nickname", "==", currentNickname.nickname)
        );
        const nicenameSnapshot = await getDocs(nicknameSearchQuery);
        if (nicenameSnapshot.docs.length === 0) {
          setOpenDialogForChangeNickname(true);
        } else {
          setErrProfileInfo({ isErrNickname: true });
          setErrMsg({ errNicknameMsg: "중복되는 닉네임입니다" });
          setTimeout(() => {
            setErrProfileInfo({ isErrNickname: false });
          }, 3000);
        }
      } else {
        setErrProfileInfo({ isErrNickname: true });
        setErrMsg({ errNicknameMsg: "기존 닉네임과 동일합니다" });
        setTimeout(() => {
          setErrProfileInfo({ isErrNickname: false });
        }, 3000);
      }
    } else {
      setErrProfileInfo({ isErrNickname: true });
      setErrMsg({ errNicknameMsg: "닉네임을 입력해주세요" });
      setTimeout(() => {
        setErrProfileInfo({ isErrNickname: false });
      }, 3000);
    }
  };

  const handleCloseDialogForChangeNickname = () => {
    setOpenDialogForChangeNickname(false);
  };

  const onSetNickName = async () => {
    await updateDoc(
      doc(
        dbService,
        "User",
        JSON.parse(sessionStorage.getItem(whisperSodlierSessionKey)).uid
      ),
      { nickname: currentNickname.nickname }
    );
    updateProfile(authService.currentUser, {
      displayName: currentNickname.nickname,
    })
      .then(() => {
        setUserName(currentNickname.nickname);
        setSuccessInfo((prev) => ({ ...prev, nickname: true }));
        setTimeout(() => {
          setSuccessInfo((prev) => ({ ...prev, nickname: false }));
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
    setOpenDialogForChangeNickname(false);
  };
  return (
    <>
      <ChangeProfileImgButton
        onClick={handleClickOpenDialogForChangeNickname}
        error={errProfileInfo.isErrNickname}
      >
        {errProfileInfo.isErrNickname
          ? errMeg.errNicknameMsg
          : "닉네임 변경하기"}
      </ChangeProfileImgButton>

      <Dialog
        open={openDialogForChangeNickname}
        onClose={handleCloseDialogForChangeNickname}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <WsDialogTitle>닉네임을 변경하시겠습니까?</WsDialogTitle>
        <DialogActions>
          <CancelButton
            onClick={handleCloseDialogForChangeNickname}
            color="primary"
            autoFocus
          >
            취소
          </CancelButton>
          <ConfirmButton color="primary" onClick={onSetNickName}>
            변경
          </ConfirmButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChangeNickname;

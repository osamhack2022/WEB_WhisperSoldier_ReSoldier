import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CheckDefaultProfileImgDialog from "./CheckDefaultProfileImgNestDialog";
import {
  BigMyInfoIcon,
  ChangeProfileImgBlock,
  CloesChangeProfileModalButton,
  ConfirmUploadImgButton,
} from "../../styles/profile/ChangeProfileStyle";
import { useState } from "react";
import { updateProfile } from "firebase/auth";
import {
  dbFunction,
  dbService,
  storageFunction,
  storageService,
} from "../../lib/FStore";
import uuid from "react-uuid";
import { whisperSodlierSessionKey } from "../../lib/Const";
import { authService } from "../../lib/FAuth";
import { Avatar } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 320,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

const UploadImgButton = styled(Button)({
  margin: "20px 0px 5px 0px",
  position: "relative",
  padding: "1px 8px",
  color: "#0d552c",
  height: "31px",
  width: "140px",
  background: "rgba(0, 0, 0, 0)",
  fontFamily: "IBM Plex Sans KR, sans-serif",
  fontWeight: "500",
  fontSize: "11px",
  textAlign: "center",
  textDecoration: "none",
  borderRadius: "25px",
  border: "1px solid rgb(26, 117, 65)",
  "&:hover": {
    background: "#0d552c",
    color: "#ffffff",
  },
});

const ChnageProfileImgButton = styled(Button)({
  margin: "15px 0px 0px 5px",
  position: "relative",
  padding: "1px 8px",
  color: "#0d552c",
  height: "31px",
  width: "140px",
  backgroundColor: "rgba(0, 0, 0, 0)",
  fontFamily: "IBM Plex Sans KR, sans-serif",
  fontWeight: "500",
  fontSize: "11px",
  textAlign: "center",
  textDecoration: "none",
  borderRadius: "25px",
  marginLeft: "10px",
  border: "1px solid rgb(26, 117, 65)",
  "&:hover": {
    background: "#0d552c",
    color: "#ffffff",
  },
});

const ChangeProfileImg = ({
  setUpdateProfileInfo,
  setMyProfileImg,
  myProfileImg,
  setSuccessInfo,
  errProfileInfo,
  setErrProfileInfo,
  errMeg,
  setErrMsg,
}) => {
  const { ref, uploadString, getDownloadURL, deleteObject } = storageFunction;
  const { doc, updateDoc } = dbFunction;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [profileImg, setProfileImg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setProfileImg(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onUploadProfileImg = async (e) => {
    e.preventDefault();
    if (profileImg) {
      setIsLoading(true);
      const attachmentRef = ref(
        storageService,
        `userProfileImg/${
          JSON.parse(sessionStorage.getItem(whisperSodlierSessionKey)).uid
        }/${uuid()}`
      );
      try {
        await uploadString(attachmentRef, profileImg, "data_url");
        const profileImgUrl = await getDownloadURL(attachmentRef);
        updateProfile(authService.currentUser, {
          photoURL: profileImgUrl,
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
              { profileImg: profileImgUrl }
            );

            setIsLoading(false);
            setMyProfileImg(profileImgUrl);

            setOpen(false);

            setSuccessInfo((prev) => ({ ...prev, profileImg: true }));
            setTimeout(() => {
              setSuccessInfo((prev) => ({ ...prev, profileImg: false }));
            }, 3000);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      setErrProfileInfo({ isProfileImg: true });
      setErrMsg({ errProfileImgMsg: "업로드 된 사진이 없습니다" });
      setTimeout(() => {
        setErrProfileInfo({ isProfileImg: false });
      }, 3000);
    }
  };

  return (
    <>
      <ChnageProfileImgButton onClick={handleOpen}>
        프로필 사진 변경
      </ChnageProfileImgButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CloesChangeProfileModalButton
            onClick={handleClose}
          ></CloesChangeProfileModalButton>
          <ChangeProfileImgBlock>
            {profileImg ? (
              <Avatar
                alt="userImg"
                src={profileImg}
                sx={{ width: 90, height: 90 }}
              />
            ) : myProfileImg ? (
              <Avatar
                alt="userImg"
                src={myProfileImg}
                sx={{ width: 90, height: 90 }}
              />
            ) : (
              <BigMyInfoIcon></BigMyInfoIcon>
            )}

            <UploadImgButton
              variant="contained"
              component="label"
              disableElevation
            >
              사진 업로드
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={onFileChange}
              />
            </UploadImgButton>

            <ConfirmUploadImgButton
              onClick={onUploadProfileImg}
              error={errProfileInfo.isProfileImg}
              isloading={isLoading}
            >
              {errProfileInfo.isProfileImg
                ? errMeg.errProfileImgMsg
                : isLoading
                ? "잠시만 기다려주세요"
                : "프로필 사진 변경"}
            </ConfirmUploadImgButton>
            <CheckDefaultProfileImgDialog
              setProfileImg={setProfileImg}
              setMyProfileImg={setMyProfileImg}
              isOuterOpen={setOpen}
              myProfileImg={myProfileImg}
              setUpdateProfileInfo={setUpdateProfileInfo}
              setSuccessInfo={setSuccessInfo}
            ></CheckDefaultProfileImgDialog>
          </ChangeProfileImgBlock>
        </Box>
      </Modal>
    </>
  );
};

export default ChangeProfileImg;

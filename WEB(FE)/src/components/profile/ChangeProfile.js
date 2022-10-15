import ChangePasswordForm from "./ChangePasswordForm";

import { useAndSetForm, useForm } from "../../modules/useForm";
import { ProfileCotentBox } from "../../styles/profile/ProfilePageStyle";
import {
  AuthInputBox,
  BigMyInfoIcon,
  ChangeNickNameBox,
  ChangeProfileBox,
  ChangeProfileImgBlock,
  ChangeProfileImgButton,
  CloesChangeProfileModalButton,
  FunctionTitle,
  MyInfoIcon,
  NicknameTextBox,
  SectionBox,
  SectionTitle,
  UploadProfileImgButton,
} from "../../styles/profile/ChangeProfileStyle";
import { authService } from "../../lib/FAuth";
import { updateProfile } from "firebase/auth";
import { whisperSodlierSessionKey } from "../../lib/Const";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { UpdateProfileInfo } from "../../store/ProfileStore";
import {
  dbFunction,
  dbService,
  storageFunction,
  storageService,
} from "../../lib/FStore";
import { updateDoc } from "firebase/firestore";
//import styled from "styled-components";
import media from "../../modules/MediaQuery";
import { UserInfo } from "../../store/AuthStore";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/system";

import uuid from "react-uuid";
import CheckDefaultProfileImgDialog from "./CheckDefaultProfileImgNestDialog";

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
  margin: "10px 0px 5px 0px",
  position: "relative",
  padding: "1px 8px",
  color: "#ffffff",
  height: "31px",
  width: "140px",
  background: "#0d552c",
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

const ChnageProfileImgButton = styled(Button)({
  margin: "10px 0px 5px 0px",
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

const ChangeProfile = ({ setUserName }) => {
  console.log(JSON.parse(sessionStorage.getItem(whisperSodlierSessionKey)));
  const { ref, uploadString, getDownloadURL, deleteObject } = storageFunction;
  const { doc, getDoc, getDocs, query, collection, where, setDoc, deleteDoc } =
    dbFunction;
  const [currentNickname, setCurrentNickname, onChange] = useAndSetForm({
    nickname: JSON.parse(sessionStorage.getItem(whisperSodlierSessionKey))
      .providerData[0].displayName,
  });
  const [errProfileInfo, setErrProfileInfo] = useState({
    isErrNickname: false,
  });
  const [myProfileImg, setMyProfileImg] = useState(
    JSON.parse(sessionStorage.getItem(whisperSodlierSessionKey)).providerData[0]
      .photoURL
  );
  const [errMeg, setErrMsg] = useState({ errNicknameMsg: "" });
  const [successInfo, setSuccessInfo] = useState({
    nickname: false,
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [profileImg, setProfileImg] = useState("");
  console.log(profileImg);
  //const onSetUserImg = async () => {};

  const onSetNickName = async () => {
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
          await updateDoc(
            doc(
              dbService,
              "User",
              JSON.parse(sessionStorage.getItem(whisperSodlierSessionKey)).uid
            ),
            { nickname: currentNickname.nickname }
          );
          console.log(authService.currentUser);
          updateProfile(authService.currentUser, {
            displayName: currentNickname.nickname,
          })
            .then(() => {
              // Profile updated!
              // ...
              console.log("닉네임 변경 성공");
              // alert("닉네임 변경을 성공했습니다.");
              setUserName(currentNickname.nickname);
              setSuccessInfo((prev) => ({ ...prev, nickname: true }));
              setTimeout(() => {
                setSuccessInfo((prev) => ({ ...prev, nickname: false }));
              }, 3000);
            })
            .catch((error) => {
              // An error occurred
              // ...
              console.log(error);
            });
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

  const onFileChange = (e) => {
    console.log(e.target.files);
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    // reader.readAsDataURL(theFile);
    reader.onloadend = (finishedEvent) => {
      console.log(finishedEvent);
      const {
        currentTarget: { result },
      } = finishedEvent;
      setProfileImg(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearImg = () => {
    setProfileImg("");
    setMyProfileImg("");
  };

  const onUploadProfileImg = async (e) => {
    e.preventDefault();
    const attachmentRef = ref(
      storageService,
      `userProfileImg/${
        JSON.parse(sessionStorage.getItem(whisperSodlierSessionKey)).uid
      }/${uuid()}`
    );
    try {
      await uploadString(attachmentRef, profileImg, "data_url").then(
        (snapshot) => {
          console.log("Uploaded a data_url string!");
        }
      );
      const profileImgUrl = await getDownloadURL(attachmentRef);

      console.log("success upload image!");
      updateProfile(authService.currentUser, {
        photoURL: profileImgUrl,
      })
        .then(() => {
          // Profile updated!
          // ...
          console.log("프로필 사진 변경 성공");
          // alert("닉네임 변경을 성공했습니다.");
          setMyProfileImg(profileImgUrl);

          setOpen(false);
        })
        .catch((error) => {
          // An error occurred
          // ...
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ProfileCotentBox>
      <ChangeProfileBox>
        <NicknameTextBox success={successInfo.nickname}>
          닉네임 변경 성공했습니다
        </NicknameTextBox>
        <SectionTitle>내 프로필 설정하기</SectionTitle>
        <SectionBox isCenter={true}>
          <FunctionTitle>프로필 사진</FunctionTitle>
          {myProfileImg.length > 0 ? (
            <Avatar
              alt="userImg"
              src={myProfileImg}
              sx={{ width: 64, height: 64 }}
            />
          ) : (
            <MyInfoIcon></MyInfoIcon>
          )}

          {/* <ChangeProfileImgButton isMarginLeft={true}>
            사진 변경하기
          </ChangeProfileImgButton> */}
          <ChnageProfileImgButton onClick={handleOpen}>
            프로필 사진 변경하기
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
                ) : myProfileImg.length > 0 ? (
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

                <Button onClick={onUploadProfileImg}>프로필 사진 업로드</Button>
                <CheckDefaultProfileImgDialog></CheckDefaultProfileImgDialog>
              </ChangeProfileImgBlock>
            </Box>
          </Modal>
        </SectionBox>
        <SectionBox>
          <FunctionTitle>별명</FunctionTitle>
          <ChangeNickNameBox>
            <AuthInputBox
              type="text"
              name="nickname"
              placeholder="닉네임을 입력해주세요"
              value={currentNickname.nickname}
              onChange={onChange}
            ></AuthInputBox>
            <ChangeProfileImgButton
              onClick={onSetNickName}
              error={errProfileInfo.isErrNickname}
            >
              {errProfileInfo.isErrNickname
                ? errMeg.errNicknameMsg
                : "닉네임 변경하기"}
            </ChangeProfileImgButton>
          </ChangeNickNameBox>
        </SectionBox>
        <SectionBox>
          <FunctionTitle>비밀번호 변경</FunctionTitle>
          <ChangePasswordForm></ChangePasswordForm>
        </SectionBox>

        {/* <WthdrawBox>
        <WthdrawButton>회원 탈퇴하기</WthdrawButton>
      </WthdrawBox> */}
      </ChangeProfileBox>
    </ProfileCotentBox>
  );
};

export default ChangeProfile;

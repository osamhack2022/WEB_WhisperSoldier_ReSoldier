import { updateProfile } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useRecoilState } from "recoil";
import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import Avatar from "@mui/material/Avatar";
import uuid from "react-uuid";
import { whisperSodlierSessionKey } from "../../lib/Const";
import { authService } from "../../lib/FAuth";
import {
  dbFunction,
  dbService,
  storageFunction,
  storageService,
} from "../../lib/FStore";
import { FirstComment } from "../common/Logos";
import AuthTemplate from "./AuthTemplate";
import { Button } from "@mui/material";
import { ConfirmUploadImgButton } from "../../styles/profile/ChangeProfileStyle";
import { updateDoc } from "firebase/firestore";

const MyInfoIcon = styled(FaUserCircle)`
  height: 100px;
  width: 100px;
  color: #555555;
`;

const MyInfoIconBoxStyle = styled.div`
  height: fit-content;
  width: fit-content;
  display: flex;
  align-items: center;
`;

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

export const MyInfoIconBox = ({ userProfileImg }) => {
  return (
    <MyInfoIconBoxStyle>
      {userProfileImg ? (
        <Avatar
          alt="userImg"
          src={userProfileImg}
          sx={{ width: 100, height: 100 }}
        />
      ) : (
        <MyInfoIcon></MyInfoIcon>
      )}
    </MyInfoIconBoxStyle>
  );
};

const Block1 = styled.div`
  margin: 70px 0px 70px 0px;
`;
const ProfileImgForm = () => {
  //   const [userInfo, setUserInfo] = useRecoilState(UserInfo);
  const { doc, getDoc, getDocs, query, collection, where, setDoc, deleteDoc } =
    dbFunction;
  const { ref, uploadString, getDownloadURL, deleteObject } = storageFunction;

  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState("");
  const [errProfileInfo, setErrProfileInfo] = useState({
    isProfileImg: false,
  });
  const [errMeg, setErrMsg] = useState({ errProfileImgMsg: "" });

  const [isLoading, setIsLoading] = useState(false);

  const onFileChange = (e) => {
    console.log(e.target.files);
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    // reader.readAsDataURL(theFile);
    reader.onloadend = (finishedEvent) => {
      //console.log(finishedEvent);
      const {
        currentTarget: { result },
      } = finishedEvent;
      setProfileImg(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onUploadProfileImg = async (e) => {
    // setUserInfo((prev) => ({ ...prev, refresh: true }));
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
            console.log("프로필 사진 변경 성공");
            // alert("닉네임 변경을 성공했습니다.");
            updateDoc(
              doc(
                dbService,
                "User",
                JSON.parse(sessionStorage.getItem(whisperSodlierSessionKey)).uid
              ),
              { profileImg: profileImgUrl }
            );

            setIsLoading(false);
            profileImg(profileImgUrl);

            // setSuccessInfo((prev) => ({ ...prev, profileImg: true }));
            // setTimeout(() => {
            //   setSuccessInfo((prev) => ({ ...prev, profileImg: false }));
            // }, 3000);
          })
          .catch((error) => {
            // An error occurred
            // ...
            console.log(error);
          });
      } catch (e) {
        console.log(e);
      }
    } else {
      setErrProfileInfo({ isProfileImg: true });
      setErrMsg({ errProfileImgMsg: "업로드 된 사진이 없습니다" });
    }

    navigate("/", { replace: true });
    window.location.reload();
  };

  return (
    <AuthTemplate>
      <FirstComment>프로필을 설정해주세요!</FirstComment>
      <Block1></Block1>
      <MyInfoIconBox userProfileImg={profileImg}></MyInfoIconBox>
      <UploadImgButton variant="contained" component="label" disableElevation>
        사진 업로드
        <input hidden accept="image/*" type="file" onChange={onFileChange} />
      </UploadImgButton>

      <ConfirmUploadImgButton
        onClick={onUploadProfileImg}
        error={errProfileInfo.isProfileImg}
        loading={isLoading}
      >
        {errProfileInfo.isProfileImg
          ? errMeg.errProfileImgMsg
          : isLoading
          ? "잠시만 기다려주세요"
          : "프로필 사진 변경"}
      </ConfirmUploadImgButton>
    </AuthTemplate>
  );
};

export default ProfileImgForm;

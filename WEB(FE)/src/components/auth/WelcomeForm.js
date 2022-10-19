import { Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { FirstComment } from "../common/Logos";
import AuthTemplate from "./AuthTemplate";
import {
  Block20px,
  Button250px40px,
  CenterItemForm,
  InputBox250px40px,
  MyInfoIcon,
  MyInfoIconBoxStyle,
  RowFlexBox,
  SubButton,
  SubButtonContainer,
  TwoColButtonBox,
} from "../../styles/common/ComponentStyle";
import { styled } from "@mui/system";
import { useState } from "react";
import {
  dbFunction,
  dbService,
  storageFunction,
  storageService,
} from "../../lib/FStore";
import { useAndSetForm } from "../../modules/useForm";
import { authService } from "../../lib/FAuth";
import { updateProfile } from "firebase/auth";
import { whisperSodlierSessionKey } from "../../lib/Const";
import axios from "axios";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";

const UploadImgButton = styled(Button)({
  margin: "0px 0px 0px 10px",
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

const ClearImgButton = styled(Button)({
  margin: "10px 0px 0px 10px",
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

const WelcomeForm = () => {
  const { ref, uploadString, getDownloadURL } = storageFunction;
  const { doc, getDocs, query, collection, where, setDoc, updateDoc } =
    dbFunction;
  const [inputValue, setInputValue, onChange] = useAndSetForm({ nickname: "" });

  const [profileImg, setProfileImg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [errProfileInfo, setErrProfileInfo] = useState({
    isErrNickname: false,
  });
  const [errMeg, setErrMsg] = useState({ errNicknameMsg: "" });

  const navigate = useNavigate();

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

  const onSetProfile = async (e) => {
    e.preventDefault();
    if (inputValue.nickname.length !== 0) {
      const nicknameSearchQuery = query(
        collection(dbService, "User"),
        where("nickname", "==", inputValue.nickname)
      );

      const nicenameSnapshot = await getDocs(nicknameSearchQuery);
      if (nicenameSnapshot.docs.length === 0) {
        setIsLoading(true);
        if (profileImg) {
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
                    JSON.parse(sessionStorage.getItem(whisperSodlierSessionKey))
                      .uid
                  ),
                  { profileImg: profileImgUrl }
                );

                setIsLoading(false);
                profileImg(profileImgUrl);
              })
              .catch((error) => {
                console.log(error);
              });
          } catch (e) {
            console.log(e);
          }
        }
        await setDoc(
          doc(
            dbService,
            "User",
            JSON.parse(sessionStorage.getItem(whisperSodlierSessionKey)).uid
          ),
          { nickname: inputValue.nickname, admin: false, profileImg: "" }
        );
        console.log(authService.currentUser);

        updateProfile(authService.currentUser, {
          displayName: inputValue.nickname,
        })
          .then(() => {
            console.log("닉네임 설정 성공");
            navigate("/", { replace: true });
            window.location.reload();
          })
          .catch((error) => {
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
      setErrMsg({ errNicknameMsg: "닉네임을 입력해주세요" });
      setTimeout(() => {
        setErrProfileInfo({ isErrNickname: false });
      }, 3000);
    }
  };

  const setClearImg = () => {
    setProfileImg("");
  };

  const onGetRandomNickname = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      "https://nickname.hwanmoo.kr/?format=json&count=1"
    );
    console.log(response.data.words[0]);
    setInputValue((prev) => ({ ...prev, nickname: response.data.words[0] }));
  };

  return (
    <AuthTemplate>
      <FirstComment>프로필을 설정해주세요!</FirstComment>
      <Block20px></Block20px>
      <CenterItemForm>
        <RowFlexBox>
          <MyInfoIconBox userProfileImg={profileImg}></MyInfoIconBox>
          <TwoColButtonBox>
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
            <ClearImgButton onClick={setClearImg}>사진 지우기</ClearImgButton>
          </TwoColButtonBox>
        </RowFlexBox>

        <InputBox250px40px
          name="nickname"
          value={inputValue.nickname}
          onChange={onChange}
          placeholder="닉네임을 입력해주세요"
        ></InputBox250px40px>
        <Button250px40px
          onClick={onSetProfile}
          error={errProfileInfo.isErrNickname}
          isLoading={isLoading}
        >
          {errProfileInfo.isErrNickname
            ? errMeg.errNicknameMsg
            : isLoading
            ? "잠시만 기다려주세요"
            : "프로필 설정하기"}
        </Button250px40px>
        <SubButtonContainer>
          <SubButton onClick={onGetRandomNickname}>
            랜덤 닉네임 설정하기
          </SubButton>
        </SubButtonContainer>
      </CenterItemForm>
    </AuthTemplate>
  );
};

export default WelcomeForm;

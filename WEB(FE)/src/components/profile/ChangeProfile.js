import ChangePasswordForm from "./ChangePasswordForm";
import { useForm } from "../../modules/useForm";
import { ProfileCotentBox } from "../../styles/profile/ProfilePageStyle";
import {
  AuthInputBox,
  ChangeNickNameBox,
  ChangeProfileBox,
  FunctionTitle,
  MyInfoIcon,
  SectionBox,
  SectionTitle,
} from "../../styles/profile/ChangeProfileStyle";
import { whisperSodlierSessionKey } from "../../lib/Const";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import WthdrawDialog from "./WthdrawDialog";
import ChangeProfileImg from "./ChangeProfileImg";
import ChangeNickname from "./ChangeNickname";
import { UpdateProfileAlert } from "../common/Alert";

const ChangeProfile = ({
  setUserName,
  setUpdateProfileInfo,
  myProfileImg,
  setMyProfileImg,
}) => {
  const [currentNickname, onChange] = useForm({
    nickname: JSON.parse(sessionStorage.getItem(whisperSodlierSessionKey))
      .providerData[0].displayName,
  });
  const [errProfileInfo, setErrProfileInfo] = useState({
    isErrNickname: false,
    isProfileImg: false,
  });

  const [errMeg, setErrMsg] = useState({
    errNicknameMsg: "",
    errProfileImgMsg: "",
  });
  const [successInfo, setSuccessInfo] = useState({
    nickname: false,
    profileImg: false,
    defaultProfileImg: false,
    password: false,
    errorPassword: false,
  });

  return (
    <ProfileCotentBox>
      <ChangeProfileBox>
        <UpdateProfileAlert successInfo={successInfo} />
        <SectionTitle>내 프로필 설정하기</SectionTitle>
        <SectionBox isCenter={true}>
          <FunctionTitle>프로필 사진</FunctionTitle>
          {myProfileImg ? (
            <Avatar
              alt="userImg"
              src={myProfileImg}
              sx={{ width: 64, height: 64 }}
            />
          ) : (
            <MyInfoIcon />
          )}
          <ChangeProfileImg
            setUpdateProfileInfo={setUpdateProfileInfo}
            setMyProfileImg={setMyProfileImg}
            myProfileImg={myProfileImg}
            setSuccessInfo={setSuccessInfo}
            errProfileInfo={errProfileInfo}
            setErrProfileInfo={setErrProfileInfo}
            errMeg={errMeg}
            setErrMsg={setErrMsg}
          />
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
            <ChangeNickname
              currentNickname={currentNickname}
              errProfileInfo={errProfileInfo}
              setErrProfileInfo={setErrProfileInfo}
              errMeg={errMeg}
              setErrMsg={setErrMsg}
              setUserName={setUserName}
              setSuccessInfo={setSuccessInfo}
            />
          </ChangeNickNameBox>
        </SectionBox>
        <SectionBox>
          <FunctionTitle>비밀번호 변경</FunctionTitle>
          <ChangePasswordForm
            setSuccessInfo={setSuccessInfo}
          ></ChangePasswordForm>
        </SectionBox>
        <SectionBox>
          <FunctionTitle>회원 탈퇴</FunctionTitle>
          <WthdrawDialog myProfileImg={myProfileImg}></WthdrawDialog>
        </SectionBox>
      </ChangeProfileBox>
    </ProfileCotentBox>
  );
};

export default ChangeProfile;

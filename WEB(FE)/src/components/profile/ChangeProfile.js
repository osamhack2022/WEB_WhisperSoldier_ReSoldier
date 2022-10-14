import ChangePasswordForm from "./ChangePasswordForm";

import { useAndSetForm, useForm } from "../../modules/useForm";
import { ProfileCotentBox } from "../../styles/profile/ProfilePageStyle";
import {
  AuthInputBox,
  ChangeNickNameBox,
  ChangeProfileBox,
  ChangeProfileImgButton,
  FunctionTitle,
  MyInfoIcon,
  SectionBox,
  SectionTitle,
} from "../../styles/profile/ChangeProfileStyle";
import { authService } from "../../lib/FAuth";
import { updateProfile } from "firebase/auth";
import { whisperSodlierSessionKey } from "../../lib/Const";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { UpdateProfileInfo } from "../../store/ProfileStore";
import { dbFunction, dbService } from "../../lib/FStore";
import { updateDoc } from "firebase/firestore";
import styled from "styled-components";
import media from "../../modules/MediaQuery";
import { UserInfo } from "../../store/AuthStore";

const NicknameTextBox = styled.div`
  position: absolute;
  z-index: 2;
  font-size: 14px;
  text-align: center;
  top: 82px;
  left: 50%;
  transform: translate(-50%, 0);
  padding: 14px 27px 8px 27px;
  border-radius: 5px;
  height: 48px;
  width: 350px;
  background-color: rgba(65, 129, 177, 10);
  opacity: ${(props) => (props.success ? "0.9" : "0")};
  color: #ffffff;
  transition: all 0.5s;
  ${media.tablet`
    padding: 14px 5px 16px 8px;
    width: 250px;
  `}
  ${media.mobile`
  top : 72px;
  left : 5vw;
  transform: inherit;
  width: 90%;
  `}
`;

const ChangeProfile = ({ setUserName }) => {
  const { doc, getDoc, getDocs, query, collection, where, setDoc, deleteDoc } =
    dbFunction;
  const [currentNickname, setCurrentNickname, onChange] = useAndSetForm({
    nickname: JSON.parse(sessionStorage.getItem(whisperSodlierSessionKey))
      .providerData[0].displayName,
  });
  const [errProfileInfo, setErrProfileInfo] = useState({
    isErrNickname: false,
  });
  const [errMeg, setErrMsg] = useState({ errNicknameMsg: "" });
  const [successInfo, setSuccessInfo] = useState({
    nickname: false,
  });

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

        // const isExistNickname = await getDoc(
        //   doc(dbService, "User", currentNickname.nickname)
        // );
        // if (!isExistNickname.data()) {
        //   await deleteDoc(
        //     doc(
        //       dbService,
        //       "UserNickname",
        //       JSON.parse(sessionStorage.getItem(whisperSodlierSessionKey))
        //         .providerData[0].displayName
        //     )
        //   );
        //   await setDoc(
        //     doc(dbService, "User", currentNickname.nickname),
        //     { nickname: currentNickname.nickname }
        //   );
        //   updateProfile(authService.currentUser, {
        //     displayName: currentNickname.nickname,
        //   })
        //     .then(() => {
        //       // Profile updated!
        //       // ...
        //       console.log("닉네임 변경 성공");
        //       setUpdateProfileInfo(true);
        //     })
        //     .catch((error) => {
        //       // An error occurred
        //       // ...
        //       console.log(error);
        //     });
        // } else {
        //   setErrProfileInfo({ isErrNickname: true });
        //   setErrMsg({ errNicknameMsg: "중복되는 닉네임입니다" });
        //   setTimeout(() => {
        //     setErrProfileInfo({ isErrNickname: false });
        //   }, 3000);
        // }
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

  return (
    <ProfileCotentBox>
      <ChangeProfileBox>
        <NicknameTextBox success={successInfo.nickname}>
          닉네임 변경 성공했습니다
        </NicknameTextBox>
        <SectionTitle>내 프로필 설정하기</SectionTitle>
        <SectionBox isCenter={true}>
          <FunctionTitle>프로필 사진</FunctionTitle>
          <MyInfoIcon></MyInfoIcon>
          <ChangeProfileImgButton isMarginLeft={true}>
            사진 변경하기
          </ChangeProfileImgButton>
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

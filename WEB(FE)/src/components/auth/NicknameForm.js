import { updateProfile } from "firebase/auth";
import { useState } from "react";
//import { useNavigate } from "react-router-dom";
//import { useRecoilState } from "recoil";
import styled from "styled-components";
import { whisperSodlierSessionKey } from "../../lib/Const";
import { authService } from "../../lib/FAuth";
import { dbFunction, dbService } from "../../lib/FStore";
import { useAndSetForm, useForm } from "../../modules/useForm";
//import { UserInfo } from "../../store/AuthStore";
import {
  AuthButton,
  AuthErrorButton,
  FindPasswordButton,
  FindPasswordButtonContainer,
} from "../common/Buttons";
import { AuthInputBox } from "../common/InputBox";
import { FirstComment } from "../common/Logos";
import AuthTemplate from "./AuthTemplate";
import axios from "axios";

const Block1 = styled.div`
  margin: 70px 0px 70px 0px;
`;
const NicknameForm = ({ setNicknameStep }) => {
  //const [userInfo, setUserInfo] = useRecoilState(UserInfo);
  const { doc, getDoc, getDocs, query, collection, where, setDoc, deleteDoc } =
    dbFunction;
  const [inputValue, setInputValue, onChange] = useAndSetForm({ nickname: "" });
  //const navigate = useNavigate();
  const [errProfileInfo, setErrProfileInfo] = useState({
    isErrNickname: false,
  });
  const [errMeg, setErrMsg] = useState({ errNicknameMsg: "" });

  const onSetNickName = async (e) => {
    e.preventDefault();
    if (inputValue.nickname.length !== 0) {
      const nicknameSearchQuery = query(
        collection(dbService, "User"),
        where("nickname", "==", inputValue.nickname)
      );

      const nicenameSnapshot = await getDocs(nicknameSearchQuery);
      if (nicenameSnapshot.docs.length === 0) {
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
      <FirstComment>닉네임을 설정해주세요!</FirstComment>
      <Block1></Block1>
      <form>
        <AuthInputBox
          name="nickname"
          value={inputValue.nickname}
          onChange={onChange}
          placeholder="닉네임을 입력해주세요"
        ></AuthInputBox>

        {errProfileInfo.isErrNickname ? (
          <AuthErrorButton>{errMeg.errNicknameMsg}</AuthErrorButton>
        ) : (
          <AuthButton onClick={onSetNickName}>닉네임 설정</AuthButton>
        )}
        <FindPasswordButtonContainer>
          <FindPasswordButton onClick={onGetRandomNickname}>
            랜덤 닉네임 설정하기
          </FindPasswordButton>
        </FindPasswordButtonContainer>
      </form>
    </AuthTemplate>
  );
};

export default NicknameForm;

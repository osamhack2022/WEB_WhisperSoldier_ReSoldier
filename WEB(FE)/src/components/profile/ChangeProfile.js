
import ChangePasswordForm from "./ChangePasswordForm";

import { useForm } from "../../modules/useForm";
import { ProfileCotentBox } from "../../styles/profile/ProfilePageStyle";
import { AuthInputBox, ChangeNickNameBox, ChangeProfileBox, ChangeProfileImgButton, FunctionTitle, MyInfoIcon, SectionBox, SectionTitle } from "../../styles/profile/ChangeProfileStyle";

const ChangeProfile = () => {
  const [currentNickname, onChange] = useForm({ nickname: "" });

  return (
    <ProfileCotentBox>
    <ChangeProfileBox>
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
            placeholder="현재 닉네임 표시"
            value={currentNickname.nickname}
            onChange={onChange}
          ></AuthInputBox>
          <ChangeProfileImgButton>별명 변경하기</ChangeProfileImgButton>
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

import styled from "styled-components";
import ChangePasswordForm from "./ChangePasswordForm";
import { FaUserCircle } from "react-icons/fa";
import { useForm } from "../../modules/useForm";

const ChangeProfileBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SectionTitle = styled.div`
  font-size: 14px;
  width: 100%;
  margin-top: 10px;
  padding-bottom: 10px;
  text-align: left;
  letter-spacing: 0.64px;
  flex-grow: 1;
  color: #0d552c;
  background-color: rgba(0, 0, 0, 0);
  font-weight: 600;
  border-bottom: 1px solid #dcdcdc;
`;

export const FunctionTitle = styled.div`
  width: 100px;
  font-size: 13px;
  margin-top: 10px;
  padding-bottom: 10px;
  text-align: left;
  letter-spacing: 0.64px;
  color: #000000;
  background-color: rgba(0, 0, 0, 0);
  font-weight: 600;
`;

const SectionBox = styled.div`
  margin-top: 10px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #dcdcdc;
  &:nth-child(2) {
    align-items: ${(props) => (props.isCenter ? "center" : "inhrit")};
  }
`;

const MyInfoIcon = styled(FaUserCircle)`
  height: 64px;
  width: 64px;
  color: #555555;
`;

export const ChangeProfileImgButton = styled.button`
  margin-top: 5px;
  position: relative;
  padding: 0px 10px;
  color: ${(props) => (props.error ? "#ffffff" : "#0d552c")};
  height: 36px;
  width: ${(props) => (props.error ? "140px" : "100px")};
  background-color: ${(props) =>
    props.error ? "#a65646" : "rgba(0, 0, 0, 0)"};
  font-weight: 500;
  font-size: 11px;
  text-align: center;
  text-decoration: none;
  border-radius: 25px;
  margin-left: ${(props) => (props.isMarginLeft ? "10px" : "0px")};
  cursor: ${(props) => (props.error ? "default" : "pointer")};
  border: ${(props) =>
    props.error ? "1px solid rgb(166, 86, 70)" : "1px solid rgb(26, 117, 65)"};
  transition: all 0.5s;
  animation: ${(props) => (props.error ? "vibration 0.1s 5" : "none")};
  white-space: nowrap;
  &:hover {
    background: ${(props) => (props.error ? "#a65646" : "#0d552c")};
    color: ${(props) => (props.error ? "#ffffff" : "#ffffff")};
  }
`;

const WthdrawButton = styled.button`
  margin-top: 5px;
  position: relative;
  padding: 0px 10px;
  color: ${(props) => (props.error ? "#ffffff" : "#0d552c")};
  height: 36px;
  width: ${(props) => (props.error ? "140px" : "100px")};
  background-color: ${(props) =>
    props.error ? "#a65646" : "rgba(0, 0, 0, 0)"};
  font-weight: 500;
  font-size: 11px;
  text-align: center;
  text-decoration: none;
  border-radius: 25px;
  cursor: ${(props) => (props.error ? "default" : "pointer")};
  border: ${(props) =>
    props.error ? "1px solid rgb(166, 86, 70)" : "1px solid rgb(26, 117, 65)"};
  transition: all 0.5s;
  animation: ${(props) => (props.error ? "vibration 0.1s 5" : "none")};
  white-space: nowrap;
  &:hover {
    background: ${(props) => (props.error ? "#a65646" : "#0d552c")};
    color: ${(props) => (props.error ? "#ffffff" : "#ffffff")};
  }
`;

const AuthInputBox = styled.input`
  width: 280px;
  height: 36px;
  margin: 5px 0px;
  padding: 16px 27px 16px 27px;
  border-radius: 25px;
  border: ${(props) =>
    props.error ? "solid 1px #CD5C5c" : "1px solid rgb(189, 189, 189)"};
  background-color: #fff;
  transition: all 0.5s;
  animation: ${(props) => (props.error ? "vibration 0.1s 5" : "none")};

  @keyframes vibration {
    from {
      transform: rotate(0.5deg);
    }
    to {
      transform: rotate(-0.5deg);
    }
  }
`;

const WthdrawBox = styled.div`
  height: fit-content;
`;

const ChangeProfile = () => {
  const [currentNickname, onChange] = useForm({ nickname: "" });

  return (
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
        <div style={{ display: "flex", flexDirection: "column" }}>
          <AuthInputBox
            type="text"
            name="nickname"
            placeholder="현재 닉네임 표시"
            value={currentNickname.nickname}
            onChange={onChange}
          ></AuthInputBox>
          <ChangeProfileImgButton>별명 변경하기</ChangeProfileImgButton>
        </div>
      </SectionBox>
      <SectionBox>
        <FunctionTitle>비밀번호 변경</FunctionTitle>
        <ChangePasswordForm></ChangePasswordForm>
      </SectionBox>

      {/* <WthdrawBox>
        <WthdrawButton>회원 탈퇴하기</WthdrawButton>
      </WthdrawBox> */}
    </ChangeProfileBox>
  );
};

export default ChangeProfile;

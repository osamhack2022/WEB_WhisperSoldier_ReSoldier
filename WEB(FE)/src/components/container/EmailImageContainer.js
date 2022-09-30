import styled from "styled-components";
import EmailImage from "../../asset/email.png";
import { AuthButton, AuthMainLink } from "../common/Buttons";

const Mail = styled.img`
  height: 78px;
  width: 78px;
`;

const EmailImageContainer = () => {
  return (
    <>
      <Mail src={EmailImage}></Mail>
      <div>
        인증메일을 발송했습니다.
        <br />
        나라사랑포털 로그인하여 인증메일을 확인해주세요
      </div>
      <AuthMainLink to="/login">로그인하러 가기</AuthMainLink>
    </>
  );
};

export default EmailImageContainer;

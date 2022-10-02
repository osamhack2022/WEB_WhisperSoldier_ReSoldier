import styled from "styled-components";
import EmailImage from "../../asset/email.png";
import { AuthMainLink } from "../common/Buttons";

const Block1 = styled.div`
  margin: 40px 0px;
`;

const Mail = styled.img`
  height: 78px;
  width: 78px;
  margin-bottom: 20px;
`;

const EmailImageContainer = ({ children }) => {
  return (
    <>
      <Block1></Block1>
      <Mail src={EmailImage}></Mail>
      {children}
      <AuthMainLink to="/login">로그인하러 가기</AuthMainLink>
    </>
  );
};

export default EmailImageContainer;

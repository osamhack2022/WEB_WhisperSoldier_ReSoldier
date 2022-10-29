import styled from "styled-components";
import { MdOutlineMailOutline } from "react-icons/md";
import { AuthMainLink } from "../common/Buttons";

const Block1 = styled.div`
  margin: 40px 0px;
`;

const Mail = styled(MdOutlineMailOutline)`
  height: 84px;
  width: 84px;
  color: #0d552c;
`;

const MailBlock = styled.div`
  height: fit-content;
  width: fit-content;
  margin-bottom: 20px;
`;

const EmailImageContainer = ({ children }) => {
  return (
    <>
      <Block1 />
      <MailBlock>
        <Mail />
      </MailBlock>
      {children}
      <AuthMainLink to="/login">로그인하러 가기</AuthMainLink>
    </>
  );
};

export default EmailImageContainer;

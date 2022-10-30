import styled from "styled-components";
import { AuthLogo, SubLogo } from "../common/Logos";

const AuthBlock = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 360px;
  width: 320px;
  background-color: #f6f6f6;
`;

const AuthTemplate = ({ children }) => {
  return (
    <AuthBlock>
      <AuthLogo>Whsiper Soldier</AuthLogo>

      <SubLogo>익명 군 상담소</SubLogo>
      {children}
    </AuthBlock>
  );
};

export default AuthTemplate;

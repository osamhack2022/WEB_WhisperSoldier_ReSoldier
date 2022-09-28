import styled from "styled-components";
import { AuthLogo, SubLogo } from "../common/Logos";

export const AuthBlock = styled.div`
  position: absolute;
  flex-direction: column;
  justify-content: center;
  display: flex;
  align-items: space-between;
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
      <AuthLogo>Whisper Soldier</AuthLogo>
      <SubLogo>익명 군 상담소</SubLogo>
      {children}
    </AuthBlock>
  );
};

export default AuthTemplate;

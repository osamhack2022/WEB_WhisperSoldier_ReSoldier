import styled from "styled-components";
import { AuthLogo, SubLogo } from "../common/Logos";
// import { ReactComponent as Logo } from "../assets/logo.svg";

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

// const AuthTitleBlock = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
// `;

// const LogoImg = styled(Logo)`
//   width: 60px;
//   height: 60px;
//   margin-right: 3px;
// `;

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

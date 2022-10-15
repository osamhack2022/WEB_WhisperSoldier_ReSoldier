import { useState } from "react";
import styled from "styled-components";
import NicknameForm from "../components/auth/NicknameForm";
import ProfileImgForm from "../components/auth/ProfileImgForm";
import media from "../modules/MediaQuery";

const WelcomePageContainer = styled.div`
  margin: 0px auto;
  width: 960px;
  display: flex;
  flex-direction: row;
  ${media.smallDesktop`
    margin: inherit;
    width: inherit;
    padding: 0px 10vw;
  `}
  ${media.mobile`
  flex-direction:column;
    padding: 0px 5vw;
  `}
`;

const WelcomePage = () => {
  const [nicknameStep, setNicknameStep] = useState(true);
  return (
    <div>
      {nicknameStep ? (
        <NicknameForm setNicknameStep={setNicknameStep}></NicknameForm>
      ) : (
        <ProfileImgForm></ProfileImgForm>
      )}
    </div>
  );
};

export default WelcomePage;

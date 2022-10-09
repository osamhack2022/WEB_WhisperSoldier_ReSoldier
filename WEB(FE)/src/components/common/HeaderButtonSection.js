import { useLocation } from "react-router-dom";
import styled from "styled-components";
import media from "../../modules/MediaQuery";
import { ChatButton, UserProfileButton, WritePostButton } from "./Buttons";

const ButtonSection = styled.div`
  position: absolute;
  right: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  ${media.smallDesktop`
    right: 10vw;
  `}
`;

export const HeaderButtonSection = () => {
  const location = useLocation();
  return (
    <ButtonSection>
      {location.pathname !== "/write" && <WritePostButton></WritePostButton>}
      <ChatButton></ChatButton>
      <UserProfileButton></UserProfileButton>
    </ButtonSection>
  );
};

import { useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  ChatButton,
  UserProfileButton,
  WritePostButton,
  WritePostSmallButton,
} from "./Buttons";

const ButtonSectionForDesktop = styled.div`
  position: absolute;
  right: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ButtonSectionForTablet = styled.div`
  position: absolute;
  right: 10vw;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const HeaderButtonSection = ({
  isDesktop,
  isSmaillDesktop,
  isTablet,
}) => {
  const location = useLocation();
  console.log(location);
  return (
    <>
      {isDesktop ? (
        <ButtonSectionForDesktop>
          {location.pathname !== "/write" && (
            <WritePostButton></WritePostButton>
          )}
          <ChatButton></ChatButton>
          <UserProfileButton></UserProfileButton>
        </ButtonSectionForDesktop>
      ) : (
        isTablet && (
          <ButtonSectionForTablet>
            {location.pathname !== "/write" && (
              <WritePostSmallButton></WritePostSmallButton>
            )}
            <ChatButton></ChatButton>
            <UserProfileButton></UserProfileButton>
          </ButtonSectionForTablet>
        )
      )}
    </>
  );
};

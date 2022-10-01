import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  ChatButton,
  UserProfileButton,
  WritePostButton,
  WritePostSmallButton,
} from "./Buttons";

const ButtonSection = styled.div`
  position: absolute;
  right: 10vw;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const HeaderButtonSectionForDesktop = () => {
  const location = useLocation();
  const isDesktop = useMediaQuery({ query: "(min-width:1100px)" });
  const isSmaillDesktop = useMediaQuery({ query: "(min-width:900px)" });
  const isTablet = useMediaQuery({ query: "(min-width:400px)" });
  console.log(location);
  return (
    <ButtonSection>
      {location.pathname !== "/write" &&
        (isDesktop ? (
          <WritePostButton></WritePostButton>
        ) : isSmaillDesktop ? (
          <WritePostSmallButton></WritePostSmallButton>
        ) : (
          isTablet && <></>
        ))}

      <ChatButton></ChatButton>
      <UserProfileButton></UserProfileButton>
    </ButtonSection>
  );
};

export const HeaderButtonSectionForSmallDesktop = () => {
  return (
    <ButtonSection>
      <ChatButton></ChatButton>
      <UserProfileButton></UserProfileButton>
    </ButtonSection>
  );
};

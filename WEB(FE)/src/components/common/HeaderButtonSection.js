import { useMediaQuery } from "react-responsive";
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
  const isDesktop = useMediaQuery({ minDeviceWidth: 1100 });
  const isSmaillDesktop = useMediaQuery({ minDeviceWidth: 900 });
  const isTablet = useMediaQuery({ minDeviceWidth: 400 });
  return (
    <ButtonSection>
      {isDesktop ? (
        <WritePostButton></WritePostButton>
      ) : isSmaillDesktop ? (
        <WritePostSmallButton></WritePostSmallButton>
      ) : (
        isTablet && <></>
      )}

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

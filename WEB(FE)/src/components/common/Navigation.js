import styled from "styled-components";
import {
  ChatNavButton,
  ProfileNavButton,
  SearchNavButton,
  WriteNavButton,
} from "./Buttons";

const NavigationBox = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  bottom: 0px;
  height: 60px;
  width: 100%;
  margin: 0%;
  border-top: 1px solid rgb(26, 117, 65);
  border-top: 1px solid #dcdcdc;
  background-color: #fbfbfb;
  z-index: 1;
`;

const Navigation = ({ isAdmin }) => {
  return (
    <NavigationBox>
      {/* <SearchNavButton toLink="/search"></SearchNavButton> */}
      {!isAdmin && <WriteNavButton></WriteNavButton>}
      {!isAdmin && <ChatNavButton></ChatNavButton>}
      <ProfileNavButton></ProfileNavButton>
    </NavigationBox>
  );
};

export default Navigation;

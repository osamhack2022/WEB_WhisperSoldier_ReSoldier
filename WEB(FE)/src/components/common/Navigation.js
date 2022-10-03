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
`;

const Navigation = () => {
  return (
    <NavigationBox>
      <SearchNavButton></SearchNavButton>
      <WriteNavButton></WriteNavButton>
      <ChatNavButton></ChatNavButton>
      <ProfileNavButton></ProfileNavButton>
    </NavigationBox>
  );
};

export default Navigation;

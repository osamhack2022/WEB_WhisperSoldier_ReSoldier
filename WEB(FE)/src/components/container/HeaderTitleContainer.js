import { Link } from "react-router-dom";
import styled from "styled-components";
import { MainTitle, MainTitleForMobile, SubTitle } from "../common/Logos";

const TitleBox = styled(Link)`
  width: 190px;
  border: none;
  text-align: right;
  height: fit-content;
  text-decoration: none;
  cursor: pointer;
`;

const TitleBoxForMobile = styled(Link)`
  width: 100%;
  border: none;
  text-align: center;
  height: fit-content;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

export const HeaderTitleContainer = () => {
  return (
    <TitleBox to="/">
      <MainTitle>Whisper Solider</MainTitle>
      <SubTitle>익명 군 상담소</SubTitle>
    </TitleBox>
  );
};

export const HeaderTitleContainerForMobile = () => {
  return (
    <TitleBoxForMobile to="/">
      <MainTitleForMobile>Whisper Solider</MainTitleForMobile>
      <SubTitle>익명 군 상담소</SubTitle>
    </TitleBoxForMobile>
  );
};

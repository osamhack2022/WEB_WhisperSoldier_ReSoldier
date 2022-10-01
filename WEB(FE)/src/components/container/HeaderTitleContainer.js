import { Link } from "react-router-dom";
import styled from "styled-components";
import { MainTitle, SubTitle } from "../common/Logos";

const TitleBox = styled(Link)`
  width: 190px;
  border: none;
  text-align: right;
  height: fit-content;
  text-decoration: none;
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

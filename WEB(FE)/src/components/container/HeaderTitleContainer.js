import styled from "styled-components";
import { MainTitle, SubTitle } from "../common/Logos";

const TitleBox = styled.div`
  width: 190px;
  height: fit-content;
`;

export const HeaderTitleContainer = () => {
  return (
    <TitleBox>
      <MainTitle>Whisper Solider</MainTitle>
      <SubTitle>익명 군 상담소</SubTitle>
    </TitleBox>
  );
};

import { useLocation } from "react-router-dom";
import styled from "styled-components";
import media from "../../modules/MediaQuery";
import { MainTitle, SubTitle } from "../common/Logos";

const TitleBox = styled.div`
  /* padding-left: 20px; */
  width: 160px;
  border: none;
  text-align: right;
  height: fit-content;
  cursor: pointer;
  ${media.smallDesktop`
  padding-left : 0px;
    width : 160px;
  `}
  ${media.mobile`
    width : 100%;
    text-align : center;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `}
`;

export const HeaderTitleContainer = ({ navigate, setInputChange }) => {
  const location = useLocation();
  const onLogoClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setInputChange((prev) => ({ ...prev, searchWord: "" }));
    }
  };
  return (
    <TitleBox onClick={onLogoClick}>
      <MainTitle>Whisper Solider</MainTitle>
      <SubTitle>익명 군 상담소</SubTitle>
    </TitleBox>
  );
};

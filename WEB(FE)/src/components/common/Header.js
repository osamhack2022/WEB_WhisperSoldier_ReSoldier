import styled from "styled-components";
import { HeaderTitleContainer } from "../container/HeaderTitleContainer";
import { HeaderButtonSection } from "./HeaderButtonSection";
import SearchSection from "./SearchSection";

import Navigation from "./Navigation";
import { useLocation } from "react-router-dom";
import media from "../../modules/MediaQuery";
import { useMediaQuery } from "react-responsive";
import { TabletQuery } from "../../lib/Const";

const HeaderContainer = styled.header`
  width: 100%;
  height: fit-content;
  background-color: #fbfbfb;
  display: flex;
  justify-content: center;
  justify-items: center;
  align-items: center;
  border-bottom: 1px solid rgb(189, 189, 189);
  padding: 0px;
  margin-bottom: 10px;
`;

const HeaderBox = styled.div`
  position: relative;
  box-sizing: content-box;
  border-radius: 5px;
  margin: 0px auto;
  /* padding: 0px auto; */
  width: 960px;
  height: 72px;
  display: flex;
  align-items: center;

  ${media.smallDesktop`
    margin: 0px;
    box-sizing: border-box;
    width : 100%;
    height: 72px;
    padding: 20px 10vw;
  `}

  ${media.mobile`
    position: relative;
    width: 100%;
    height: 60px;
    padding: 20px 5vw;
    display: flex;
    align-items: center;
  `}
`;

const Header = () => {
  const location = useLocation();
  const isTablet = useMediaQuery({ query: TabletQuery });
  return (
    <HeaderContainer>
      <HeaderBox>
        <HeaderTitleContainer></HeaderTitleContainer>
        {isTablet && (
          <>
            {location.pathname !== "/search" && (
              <SearchSection toLink="/search"></SearchSection>
            )}
            <HeaderButtonSection></HeaderButtonSection>
          </>
        )}
      </HeaderBox>
      {!isTablet && <Navigation></Navigation>}
    </HeaderContainer>
  );
};

export default Header;

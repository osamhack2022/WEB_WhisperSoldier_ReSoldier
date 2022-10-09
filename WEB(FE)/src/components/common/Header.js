import styled from "styled-components";
import { HeaderTitleContainer } from "../container/HeaderTitleContainer";
import { HeaderButtonSection } from "./HeaderButtonSection";
import SearchSection from "./SearchSection";

import Navigation from "./Navigation";
import { useLocation } from "react-router-dom";
import media from "../../modules/MediaQuery";
import { useMediaQuery } from "react-responsive";
import { TabletQuery } from "../../lib/Const";

const HeaderBox = styled.header`
  position: relative;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
  margin: 0px auto;
  margin-bottom: 10px;
  width: 960px;
  height: 90px;
  display: flex;
  align-items: center;
  ${media.smallDesktop`
    margin: inherit;
    margin-bottom :10px;
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
    <>
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
    </>
  );
};

export default Header;

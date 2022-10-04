import styled from "styled-components";
import {
  HeaderTitleContainer,
  HeaderTitleContainerForMobile,
  HeaderTitleContainerForTablet,
} from "../container/HeaderTitleContainer";
import { HeaderButtonSection } from "./HeaderButtonSection";
import SearchSection from "./SearchSection";

import Navigation from "./Navigation";

const HeaderBoxForDesktop = styled.header`
  position: relative;
  margin: 0px auto;
  width: 960px;
  height: 90px;
  display: flex;
  align-items: center;
`;

const HeaderBoxForTablet = styled.header`
  position: relative;
  width: 100%;
  height: 72px;
  padding: 20px 10vw;
  display: flex;
  align-items: center;
`;

const HeaderBoxForMobile = styled.header`
  position: relative;
  width: 100%;
  height: 60px;
  padding: 20px 5vw;
  display: flex;
  align-items: center;
`;

const Header = ({ isDesktop, isSmallDesktop, isTablet }) => {
  return (
    <>
      {isDesktop ? (
        <HeaderBoxForDesktop>
          <HeaderTitleContainer></HeaderTitleContainer>
          <SearchSection
            isDesktop={isDesktop}
            isSmallDesktop={isSmallDesktop}
            isTablet={isTablet}
          ></SearchSection>
          <HeaderButtonSection
            isDesktop={isDesktop}
            isSmallDesktop={isSmallDesktop}
            isTablet={isTablet}
          ></HeaderButtonSection>
        </HeaderBoxForDesktop>
      ) : isTablet ? (
        <HeaderBoxForTablet>
          <HeaderTitleContainerForTablet></HeaderTitleContainerForTablet>
          <SearchSection
            isDesktop={isDesktop}
            isSmallDesktop={isSmallDesktop}
            isTablet={isTablet}
          ></SearchSection>
          <HeaderButtonSection
            isDesktop={isDesktop}
            isSmallDesktop={isSmallDesktop}
            isTablet={isTablet}
          ></HeaderButtonSection>
        </HeaderBoxForTablet>
      ) : (
        <>
          <HeaderBoxForMobile>
            <HeaderTitleContainerForMobile></HeaderTitleContainerForMobile>
          </HeaderBoxForMobile>
          <Navigation></Navigation>
        </>
      )}
    </>
  );
};

export default Header;

import styled from "styled-components";
import {
  HeaderTitleContainer,
  HeaderTitleContainerForMobile,
} from "../container/HeaderTitleContainer";
import { HeaderButtonSection } from "./HeaderButtonSection";
import SearchSection from "./SearchSection";
import {
  BigDesktopQuery,
  DesktopQuery,
  SmallDesktopQuery,
  TabletQuery,
} from "../../lib/Const";
import { useMediaQuery } from "react-responsive";
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
  height: 90px;
  padding: 20px 10vw;
  display: flex;
  align-items: center;
`;

const HeaderBoxForMobile = styled.header`
  position: relative;
  width: 100%;
  height: 64px;
  padding: 20px 5vw;
  display: flex;
  align-items: center;
`;

const Header = () => {
  const isDesktop = useMediaQuery({ query: DesktopQuery });
  const isSmallDesktop = useMediaQuery({ query: SmallDesktopQuery });
  const isTablet = useMediaQuery({ query: TabletQuery });
  console.log("isDesktop : ", isDesktop);
  console.log("isSmallDesktop : ", isSmallDesktop);
  console.log("isTablet : ", isTablet);
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
        </HeaderBoxForTablet>
      ) : (
        <>
          <HeaderBoxForMobile>
            <HeaderTitleContainerForMobile></HeaderTitleContainerForMobile>
            <HeaderButtonSection
              isDesktop={isDesktop}
              isSmallDesktop={isSmallDesktop}
              isTablet={isTablet}
            ></HeaderButtonSection>
          </HeaderBoxForMobile>
          <Navigation></Navigation>
        </>
      )}
    </>
  );
};

export default Header;

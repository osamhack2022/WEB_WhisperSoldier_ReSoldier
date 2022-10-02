import styled from "styled-components";
import { HeaderTitleContainer } from "../container/HeaderTitleContainer";
import { HeaderButtonSection } from "./HeaderButtonSection";
import SearchSection from "./SearchSection";

const HeaderBox = styled.header`
  position: relative;
  width: 100%;
  height: 90px;
  padding: 20px 10vw;
  display: flex;
  align-items: center;
`;

const Header = () => {
  return (
    <HeaderBox>
      <HeaderTitleContainer></HeaderTitleContainer>
      <SearchSection></SearchSection>
      <HeaderButtonSection></HeaderButtonSection>
    </HeaderBox>
  );
};

export default Header;

/*
<>
      {isDesktop ? (
        
      ) : (
        isSmaillDesktop && (
          <HeaderBox>
            <HeaderTitleContainer></HeaderTitleContainer>
            <SearchSection></SearchSection>
            <HeaderButtonSectionForSmallDesktop></HeaderButtonSectionForSmallDesktop>
          </HeaderBox>
        )
      )}
    </>
 */

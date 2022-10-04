import styled from "styled-components";
import PostBoard from "../post/PostBoard";

const HomeContainerBoxForDesktop = styled.div`
  margin: 0px auto;
  display: flex;
  width: 960px;
  flex-direction: row;
`;

const HomeContainerBoxForTablet = styled.div`
  padding: 0px 10vw;
  display: flex;
  flex-direction: row;
`;

const HomeContainerBoxForMobile = styled.div`
  padding: 0px 5vw;
  display: flex;
  flex-direction: column;
`;

const HomeContainer = ({ isDesktop, isSmallDesktop, isTablet }) => {
  return (
    <>
      {isDesktop ? (
        <HomeContainerBoxForDesktop>
          <PostBoard
            isDesktop={isDesktop}
            isSmallDesktop={isSmallDesktop}
            isTablet={isTablet}
          ></PostBoard>
        </HomeContainerBoxForDesktop>
      ) : isTablet ? (
        <HomeContainerBoxForTablet>
          <PostBoard
            isDesktop={isDesktop}
            isSmallDesktop={isSmallDesktop}
            isTablet={isTablet}
          ></PostBoard>
        </HomeContainerBoxForTablet>
      ) : (
        <HomeContainerBoxForMobile>
          <PostBoard
            isDesktop={isDesktop}
            isSmallDesktop={isSmallDesktop}
            isTablet={isTablet}
          ></PostBoard>
        </HomeContainerBoxForMobile>
      )}
    </>
  );
};

export default HomeContainer;

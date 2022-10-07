import styled from "styled-components";
import media from "../../modules/MediaQuery";

const PostBoardContainerForDesktop = styled.div`
  height: fit-content;
  flex-grow: 1;
`;

const PostBoardContainerForTablet = styled.div`
  height: fit-content;
  /*width: 60vw;*/
  flex-grow: 1;
`;

const PostBoardContainerForMobile = styled.div`
  height: fit-content;
  width: 100%;
`;

export const PostBoardContainer = ({ isDesktop, isTablet, children }) => {
  return (
    <>
      {isDesktop ? (
        <PostBoardContainerForDesktop>{children}</PostBoardContainerForDesktop>
      ) : isTablet ? (
        <PostBoardContainerForTablet>{children}</PostBoardContainerForTablet>
      ) : (
        <PostBoardContainerForMobile>{children}</PostBoardContainerForMobile>
      )}
    </>
  );
};

export const SideOptionContainer = styled.div`
  margin-left: 10px;
  height: fit-content;
  width: 260px;
  ${media.mobile`
    margin-left: inherit;
    margin-top: 10px;
    width: 100%;
    position: relative;
  `}
`;

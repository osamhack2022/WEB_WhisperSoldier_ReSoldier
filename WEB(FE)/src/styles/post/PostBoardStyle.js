import styled from "styled-components";

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

const SideOptionContainerForDesktop = styled.div`
  margin-left: 10px;
  height: fit-content;
  width: 260px;
  /*flex-grow: 1;*/
`;

const SideOptionContainerForTablet = styled.div`
  margin-left: 10px;
  height: fit-content;
  width: 260px;
  /*flex-grow: 1;*/
`;

const SideOptionContainerForMobile = styled.div`
  margin-top: 10px;
  height: fit-content;
  width: 100%;
  position: relative;
  /*flex-grow: 1;*/
`;

export const SideOptionContainer = ({ isDesktop, isTablet, children }) => {
  return (
    <>
      {isDesktop ? (
        <SideOptionContainerForDesktop>
          {children}
        </SideOptionContainerForDesktop>
      ) : isTablet ? (
        <SideOptionContainerForTablet>{children}</SideOptionContainerForTablet>
      ) : (
        <SideOptionContainerForMobile>{children}</SideOptionContainerForMobile>
      )}
    </>
  );
};

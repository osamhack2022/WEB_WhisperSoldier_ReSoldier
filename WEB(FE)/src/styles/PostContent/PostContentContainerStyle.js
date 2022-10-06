import styled from "styled-components";

const PostContentContainerBoxForDesktop = styled.div`
  margin: 0px auto;
  display: flex;
  width: 960px;
  flex-direction: row;
`;

const PostContentContainerBoxForTablet = styled.div`
  padding: 0px 10vw;
  display: flex;
  flex-direction: row;
`;

const PostContentContainerBoxForMobile = styled.div`
  padding: 0px 5vw;
  display: flex;
  flex-direction: column;
`;

export const PostContentContainerBox = ({ isDesktop, isTablet, children }) => {
  return isDesktop ? (
    <PostContentContainerBoxForDesktop>
      {children}
    </PostContentContainerBoxForDesktop>
  ) : isTablet ? (
    <PostContentContainerBoxForTablet>
      {children}
    </PostContentContainerBoxForTablet>
  ) : (
    <PostContentContainerBoxForMobile>
      {children}
    </PostContentContainerBoxForMobile>
  );
};

const SideButtonContainerForDesktop = styled.div`
  display: flex;
  width: 110px;
  flex-direction: column;
`;

const SideButtonContainerForMobile = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const SideButtonContainer = ({ isDesktop, isTablet, children }) => {
  return isTablet ? (
    <SideButtonContainerForDesktop>{children}</SideButtonContainerForDesktop>
  ) : (
    <SideButtonContainerForMobile>{children}</SideButtonContainerForMobile>
  );
};

const PostContentBodyContainerForDesktop = styled.div`
  margin-left: 10px;
  flex-grow: 1;
`;

const PostContentBodyContainerForTablet = styled.div`
  height: fit-content;
  flex-grow: 1;
  margin-left: 10px;
`;

const PostContentBodyContainerForMobile = styled.div`
  margin-top: 10px;
  width: inherit;
  height: fit-content;
  /*width: inherit;*/
`;

export const PostContentBodyContainer = ({ isDesktop, isTablet, children }) => {
  console.log(isDesktop, isTablet);
  return isDesktop ? (
    <PostContentBodyContainerForDesktop>
      {children}
    </PostContentBodyContainerForDesktop>
  ) : isTablet ? (
    <PostContentBodyContainerForTablet>
      {children}
    </PostContentBodyContainerForTablet>
  ) : (
    <PostContentBodyContainerForMobile>
      {children}
    </PostContentBodyContainerForMobile>
  );
};

const SideOptionContainer = styled.div`
  /*
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  */
`;

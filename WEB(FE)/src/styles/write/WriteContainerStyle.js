import styled from "styled-components";

const WriteContainerBoxForDesktop = styled.div`
  margin: 0px auto;
  display: flex;
  width: 960px;
  flex-direction: row;
`;

const WriteContainerBoxForTablet = styled.div`
  padding: 0px 10vw;
  display: flex;
  flex-direction: row;
`;

const WriteContainerBoxForMobile = styled.div`
  padding: 0px 5vw;
  display: flex;
  flex-direction: column;
`;

export const WriteContainerBox = ({ isDesktop, isTablet, children }) => {
  return (
    <>
      {isDesktop ? (
        <WriteContainerBoxForDesktop>{children}</WriteContainerBoxForDesktop>
      ) : isTablet ? (
        <WriteContainerBoxForTablet>{children}</WriteContainerBoxForTablet>
      ) : (
        <WriteContainerBoxForMobile>{children}</WriteContainerBoxForMobile>
      )}
    </>
  );
};
const SideOptionContainerForDesktop = styled.div`
  margin-left: 10px;
  height: fit-content;
  width: 200px;
  /*flex-grow: 1;*/
`;

const SideOptionContainerForTablet = styled.div`
  margin-left: 10px;
  height: fit-content;
  width: 200px;
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

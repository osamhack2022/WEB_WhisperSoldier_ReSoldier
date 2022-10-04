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
  console.log(isDesktop, isTablet);
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

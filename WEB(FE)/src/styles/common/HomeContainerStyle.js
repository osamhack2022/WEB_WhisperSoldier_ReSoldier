import styled from "styled-components";
import media from "../../modules/MediaQuery";

export const HomeContainerBox = styled.div`
  position: relative;
  margin: 0px auto;
  width: 960px;
  display: flex;
  /* flex-direction: column; */
  flex-direction: row;
  ${media.smallDesktop`
    margin: inherit;
    width: inherit;
    padding: 0px 10vw;
  `}
  ${media.tablet`
    flex-direction : column;
  `}
  ${media.mobile`
    padding: 0px 5vw;
  `}
`;

export const HomeMainContentBox = styled.div`
  flex-grow: 1;
  width: 510px;
  ${media.tablet`
    width : 100%
  `}
`;

export const HomeSubContentBox = styled.div`
  width: 200px;
  ${media.tablet`
    width : 100%;
  `}
`;

export const HomeContentUpperBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  transition: all 0.5s;
  flex-grow: 1;
  ${media.tablet`
  flex-direction : column;
  `}
`;

export const HomeContentLowerBox = styled.div`
  /*  */
  /* display: flex;
    flex-direction: row; */
  transition: all 0.5s;

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  grid-auto-flow: row dense;
  width: 100%;
  /* grid-template-columns: repeat(2, minmax(100px, auto)); */
  /* overflow: unset; */
  ${media.tablet`
  
  `}
  ${media.mobile`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    grid-template-columns: inherit;
    gap: inherit;
    grid-auto-flow: inherit;
    /* width: 100%; */
  `}
`;

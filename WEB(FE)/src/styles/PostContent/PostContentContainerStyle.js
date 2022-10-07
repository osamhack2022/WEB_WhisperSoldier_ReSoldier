import styled from "styled-components";
import media from "../../modules/MediaQuery";

export const PostContentContainerBox = styled.div`
  margin: 0px auto;
  display: flex;
  width: 960px;
  flex-direction: row;
  transition: all 0.5s;
  ${media.smallDesktop`
  margin: inherit;
  width: inherit;
  padding: 0px 10vw;
  `}
  ${media.mobile`
  padding: 0px 5vw;
  flex-direction: column;
  `}
`;

export const SideButtonContainer = styled.div`
  width: 110px;
  display: flex;
  flex-direction: column;
  ${media.mobile`
  width: 100%;
  flex-direction : row;
  `}
`;

export const PostContentBodyContainer = styled.div`
  margin-left: 10px;
  flex-grow: 1;
  ${media.smallDesktop`
  height: fit-content;
  `}
  ${media.mobile`
  margin-left: inherit;
  margin-top : 10px;
  width: inherit;
  `}
`;

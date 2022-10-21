import styled from "styled-components";
import media from "../../modules/MediaQuery";

export const PostContentContainerBox = styled.div`
  margin: 0px auto;
  display: flex;
  width: 960px;
  flex-direction: row;
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
  width: 100%;
  display: flex;
  flex-direction: column;
  ${media.mobile`
  width: 100%;
  flex-direction : row;
  `}
`;

export const PostContentBodyContainer = styled.div`
  position: relative;
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

export const PostContentBodyBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fbfbfb;
  border-radius: 5px;
  padding: 5px 20px 5px 20px;
  border: 1px solid rgb(189, 189, 189);
`;

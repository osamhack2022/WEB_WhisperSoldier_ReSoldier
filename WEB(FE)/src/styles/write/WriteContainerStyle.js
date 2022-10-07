import styled from "styled-components";
import media from "../../modules/MediaQuery";

export const WriteContainerBox = styled.div`
  display: flex;
  margin: 0px auto;
  width: 960px;
  flex-direction: row;
  ${media.smallDesktop`
    margin: inherit;
    width: inherit;
    padding: 0px 10vw;
  `}
  ${media.mobile`
    margin: inherit;
    width: inherit;
    padding: 0px 5vw;
    flex-direction: column;
  `}
`;

export const SideOptionContainer = styled.div`
  margin-left: 10px;
  height: fit-content;
  width: 200px;
  ${media.mobile`
    margin-left: inherit;
    margin-top: 10px;
    width: 100%;
    position: relative;
  `}
`;

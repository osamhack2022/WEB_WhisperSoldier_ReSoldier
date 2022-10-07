import styled from "styled-components";
import media from "../../modules/MediaQuery";

export const PostBoardContainer = styled.div`
  height: fit-content;
  flex-grow: 1;
  ${media.mobile`
  flex-grow: inherit;
  width: 100%;
  `}
`;

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

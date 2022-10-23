import styled from "styled-components";
import TagPostBoardCotent from "../components/tag/SelectTagPostBoard";
import media from "../modules/MediaQuery";

const TagBoardContainerBox = styled.div`
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

const TagBoard = () => {
  return (
    <TagBoardContainerBox>
      <TagPostBoardCotent />
    </TagBoardContainerBox>
  );
};

export default TagBoard;

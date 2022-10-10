import styled from "styled-components";
import PostBoard from "../components/post/PostBoard";
import media from "../modules/MediaQuery";

export const BoardContainer = styled.div`
  margin: 0px auto;
  width: 960px;
  display: flex;
  flex-direction: row;
  ${media.smallDesktop`
    margin: inherit;
    width: inherit;
    padding: 0px 10vw;
  `}
  ${media.mobile`
    padding: 0px 5vw;
  `}
`;

const BoardPage = () => {
  return (
    <BoardContainer>
      <PostBoard></PostBoard>
    </BoardContainer>
  );
};

export default BoardPage;

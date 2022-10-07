import styled from "styled-components";
import media from "../../modules/MediaQuery";
import PostBoard from "../post/PostBoard";

const HomeContainerBox = styled.div`
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
  flex-direction: column;
  `}
`;

const HomeContainer = () => {
  return (
    <HomeContainerBox>
      <PostBoard></PostBoard>
    </HomeContainerBox>
  );
};

export default HomeContainer;

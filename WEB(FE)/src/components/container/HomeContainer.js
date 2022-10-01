import styled from "styled-components";
import PostBoard from "../post/PostBoard";

const HomeContainerBox = styled.div`
  padding: 0px 10vw;
  display: flex;
  flex-direction: row;
`;

const HomeContainer = () => {
  return (
    <>
      <HomeContainerBox>
        <PostBoard></PostBoard>
      </HomeContainerBox>
    </>
  );
};

export default HomeContainer;

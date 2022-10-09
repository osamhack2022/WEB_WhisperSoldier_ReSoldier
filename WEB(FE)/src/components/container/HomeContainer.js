import styled from "styled-components";
import media from "../../modules/MediaQuery";
import PostBoard from "../post/PostBoard";

const HomeContainerBox = styled.div`
  margin: 0px auto;
  width: 960px;
  display: flex;
  flex-direction: column;
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

const HomeContentUpperBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const HomeContentLowerBox = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const BannerBox = styled.div`
  position: relative;
  padding: 0px 20px 0px 20px;
  height: 240px;
  flex-grow: 1;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
`;

const DashBoardBox = styled.div`
  margin-left: 10px;
  position: relative;
  padding: 0px 20px 0px 20px;
  height: 240px;
  width: 240px;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
`;

const PopularPostBox = styled.div`
  margin-left: 10px;
  position: relative;
  padding: 0px 20px 0px 20px;
  height: 480px;
  flex-grow: 1;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
`;

const NewestPostBox = styled.div`
  position: relative;
  padding: 0px 20px 0px 20px;
  height: 480px;
  flex-grow: 1;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
`;

const TagBox = styled.div`
  margin-left: 10px;
  position: relative;
  padding: 0px 20px 0px 20px;
  height: 480px;
  width: 240px;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
`;

const HomeContainer = () => {
  return (
    <HomeContainerBox>
      <HomeContentUpperBox>
        <BannerBox></BannerBox>
        <DashBoardBox></DashBoardBox>
      </HomeContentUpperBox>
      <HomeContentLowerBox>
        <NewestPostBox></NewestPostBox>
        <PopularPostBox></PopularPostBox>
        <TagBox></TagBox>
      </HomeContentLowerBox>
      {/* <PostBoard></PostBoard> */}
    </HomeContainerBox>
  );
};

export default HomeContainer;

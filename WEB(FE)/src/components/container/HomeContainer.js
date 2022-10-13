import {
  BannerBox,
  DashBoardBox,
  HomeContainerBox,
  HomeContentLowerBox,
  HomeContentUpperBox,
  NewestPostBox,
  PopularPostBox,
  TagBox,
} from "../../styles/common/HomeContainerStyle";
//import PostBoard from "../post/PostBoard";

const HomeContainer = () => {
  return (
    <HomeContainerBox>
      <HomeContentUpperBox>
        <BannerBox>배너 박스</BannerBox>
        <DashBoardBox>대시보드 박스</DashBoardBox>
      </HomeContentUpperBox>
      <HomeContentLowerBox>
        <NewestPostBox></NewestPostBox>
        <PopularPostBox></PopularPostBox>
        <TagBox>태그 목록 박스</TagBox>
      </HomeContentLowerBox>
      {/* <PostBoard></PostBoard> */}
    </HomeContainerBox>
  );
};

export default HomeContainer;

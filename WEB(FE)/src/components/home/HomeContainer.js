import {
  BannerBox,
  DashBoardBox,
  HomeContainerBox,
  HomeContentLowerBox,
  HomeContentUpperBox,
  TagBox,
} from "../../styles/common/HomeContainerStyle";
import NewestPostBox from "./NewestPostBox";
import PopularPostBox from "./PopularPostBox";
import PostBoard from "../post/PostBoard";

const HomeContainer = () => {
  return (
    <HomeContainerBox>
      <HomeContentUpperBox>
        <BannerBox></BannerBox>
        <DashBoardBox>대시보드 박스</DashBoardBox>
      </HomeContentUpperBox>
      <HomeContentLowerBox>
        <NewestPostBox>최신 포스트 박스</NewestPostBox>
        <PopularPostBox>인기 포스트 박스</PopularPostBox>
        <TagBox>태그 목록 박스</TagBox>
      </HomeContentLowerBox>
      {/* <PostBoard></PostBoard> */}
    </HomeContainerBox>
  );
};

export default HomeContainer;

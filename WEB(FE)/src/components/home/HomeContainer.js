import {
  HomeContainerBox,
  HomeContentLowerBox,
  HomeContentUpperBox,
} from "../../styles/common/HomeContainerStyle";
import BannerBox from "./HomeBanner";
import TagBox from "./PopularTagBox";
import DashBoardBox from "./DashBoardBox";
import PostBox from "./PostBox";

const HomeContainer = () => {
  return (
    <HomeContainerBox>
      <HomeContentUpperBox>
        <BannerBox></BannerBox>
        <DashBoardBox></DashBoardBox>
      </HomeContentUpperBox>
      <HomeContentLowerBox>
        <PostBox></PostBox>
        <PostBox isLikeDesc={true}></PostBox>
        <TagBox></TagBox>
      </HomeContentLowerBox>
    </HomeContainerBox>
  );
};

export default HomeContainer;

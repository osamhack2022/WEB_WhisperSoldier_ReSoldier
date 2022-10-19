import {
  HomeContainerBox,
  HomeContentLowerBox,
  HomeContentUpperBox,
  HomeMainContentBox,
  HomeSubContentBox,
} from "../../styles/common/HomeContainerStyle";
import BannerBox from "./HomeBanner";
import TagBox from "./PopularTagBox";
// import DashBoardBox from "./DashBoardBox";
import PostBox from "./PostBox";

const HomeContainer = () => {
  return (
    <HomeContainerBox>
      <HomeMainContentBox>
      <HomeContentUpperBox>
        <BannerBox></BannerBox>
      </HomeContentUpperBox>
      <HomeContentLowerBox>
        <PostBox></PostBox>
        <PostBox isLikeDesc={true}></PostBox>
      </HomeContentLowerBox>
      </HomeMainContentBox>

      <HomeSubContentBox>
        <TagBox></TagBox>
      </HomeSubContentBox>
      
      
    </HomeContainerBox>
  );
};

export default HomeContainer;

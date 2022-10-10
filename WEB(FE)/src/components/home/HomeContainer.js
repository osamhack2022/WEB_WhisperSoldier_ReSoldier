import {
  HomeContainerBox,
  HomeContentLowerBox,
  HomeContentUpperBox,
} from "../../styles/common/HomeContainerStyle";
import NewestPostBox from "./NewestPostBox";
import PopularPostBox from "./PopularPostBox";
import BannerBox from "./HomeBanner";
import TagBox from "./PopularTagBox";
import DashBoardBox from "./DashBoardBox";

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
    </HomeContainerBox>
  );
};

export default HomeContainer;

import {
  HomeContainerBox,
  HomeContentLowerBox,
  HomeContentUpperBox,
} from "../../styles/common/HomeContainerStyle";
import BannerBox from "./HomeBanner";
import TagBox from "./PopularTagBox";
import DashBoardBox from "./DashBoardBox";
import PostBox from "./PostBox";
import { Link } from "react-router-dom";

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
				<Link to={"/tags"}>태그 페이지로</Link>
      </HomeContentLowerBox>
    </HomeContainerBox>
  );
};

export default HomeContainer;

import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { TabletQuery } from "../../lib/Const";
import { useAndSetForm } from "../../modules/useForm";
import { ProcessInfoStore } from "../../store/SuccessStore";
import {
  HomeContainerBox,
  HomeContentLowerBox,
  HomeContentUpperBox,
  HomeMainContentBox,
  HomeSubContentBox,
} from "../../styles/common/HomeContainerStyle";
import { HomeContentAlert } from "../common/Alert";
import SearchSection from "../common/SearchSection";
import BannerBox from "./HomeBanner";
import TagBox from "./PopularTagBox";
import PostBox from "./PostBox";

const HomeContainer = () => {
  const isTablet = useMediaQuery({ query: TabletQuery });
  const navigate = useNavigate();
  const [processInfo, setProcessInfoStore] = useRecoilState(ProcessInfoStore);
  const [alertState, setAlertState] = useState({
    writePost: false,
    deletePost: false,
  });
  const [inputValue, setInputChange, onChange] = useAndSetForm({
    searchWord: "",
  });

  //작업 상테 변경될때마다 업데이트
  useEffect(() => {
    if (processInfo.finishWritePost) {
      setAlertState((prev) => ({ ...prev, writePost: true }));
      setTimeout(() => {
        setProcessInfoStore((prev) => ({
          ...prev,
          finishWritePost: false,
        }));
        setAlertState((prev) => ({ ...prev, writePost: false }));
      }, 3000);
    } else if (processInfo.finishDeletePost) {
      setAlertState((prev) => ({ ...prev, deletePost: true }));
      setTimeout(() => {
        setProcessInfoStore((prev) => ({
          ...prev,
          finishDeletePost: false,
        }));
        setAlertState((prev) => ({ ...prev, deletePost: false }));
      }, 3000);
    }
    //eslint-disable-next-line
  }, [processInfo]);

  return (
    <HomeContainerBox>
      <HomeContentAlert alertState={alertState} />
      {!isTablet && (
        <SearchSection
          navigate={navigate}
          inputValue={inputValue}
          onChange={onChange}
        ></SearchSection>
      )}
      <HomeMainContentBox>
        <HomeContentUpperBox>
          <BannerBox></BannerBox>
        </HomeContentUpperBox>
        <HomeContentLowerBox>
          <PostBox></PostBox>
          <PostBox isLikeDesc={true}></PostBox>
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

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
import TagPostBox from "./TagPostBox";

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
  const [tagList, setTagList] = useState([]);

  //작업 상테 변경될때마다 업데이트
  useEffect(() => {
    // setTagList([]);
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
          <BannerBox />
        </HomeContentUpperBox>
        <HomeContentLowerBox>
          {isTablet ? (
            <>
              <div>
                <PostBox />
                {tagList.length >= 1 && (
                  <TagPostBox bottombox={true} tagList={tagList} first={true} />
                )}
              </div>
              <div>
                <PostBox isLikeDesc={true} />
                {tagList.length >= 2 && (
                  <TagPostBox
                    bottombox={true}
                    tagList={tagList}
                    first={false}
                  />
                )}
                {/* <PostBox isLikeDesc={true} bottombox={true}/> */}
              </div>
            </>
          ) : (
            <>
              <PostBox />
              <PostBox isLikeDesc={true} />
              {tagList.length >= 1 && (
                <TagPostBox bottombox={true} tagList={tagList} first={true} />
              )}
              {tagList.length >= 2 && (
                <TagPostBox bottombox={true} tagList={tagList} first={false} />
              )}
            </>
          )}
        </HomeContentLowerBox>
      </HomeMainContentBox>
      <HomeSubContentBox>
        <TagBox tagList={tagList} setTagList={setTagList}></TagBox>
      </HomeSubContentBox>
    </HomeContainerBox>
  );
};

export default HomeContainer;

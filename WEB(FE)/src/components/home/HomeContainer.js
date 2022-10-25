import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import media from "../../modules/MediaQuery";
import { ProcessInfoStore } from "../../store/SuccessStore";
import {
  HomeContainerBox,
  HomeContentLowerBox,
  HomeContentUpperBox,
  HomeMainContentBox,
  HomeSubContentBox,
} from "../../styles/common/HomeContainerStyle";
import { HomeContentAlert } from "../common/Alert";
import BannerBox from "./HomeBanner";
import TagBox from "./PopularTagBox";
import PostBox from "./PostBox";

const AlertTextBox = styled.div`
  position: fixed;
  z-index: 3;
  font-size: 14px;
  text-align: center;
  top: 82px;
  left: 50%;
  transform: translate(-50%, 0%);
  padding: 14px 27px 8px 27px;
  border-radius: 5px;
  height: 48px;
  width: 350px;
  background-color: ${(props) =>
    props.redcolor ? "rgba(166, 86, 70, 10)" : "rgba(65, 129, 177, 10)"};
  opacity: ${(props) => (props.success ? "0.9" : "0")};
  visibility: ${(props) => (props.success ? "visible" : "hidden")};
  color: #ffffff;
  transition: all 0.5s;
  ${media.tablet`
    padding: 14px 5px 16px 8px;
    width: 250px;
  `}
  ${media.mobile`
  top : 72px;
  left : 5vw;
  transform: inherit;
  width: 90%;
  `}
`;

const HomeContainer = () => {
  const [processInfo, setProcessInfoStore] = useRecoilState(ProcessInfoStore);
  const [alertState, setAlertState] = useState({
    writePost: false,
    deletePost: false,
  });

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

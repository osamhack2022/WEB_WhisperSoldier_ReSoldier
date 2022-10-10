import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { getSearchQuery } from "../../modules/GetSearchQuery";
import getTimeDepth from "../../modules/GetTimeDepth";
import { IsUpdatePostList } from "../../store/PostStore";
import {
  PostBoxStyle,
  PostBoxTitle,
  PostMoreBox,
  PostMoreLink,
} from "../../styles/home/PostBoxStyle";
import PostElement from "../post/PostElement";

const PostBox = ({ isLikeDesc }) => {
  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);
  const setIsUpdatePostList = useSetRecoilState(IsUpdatePostList);

  const getFivePost = async () => {
    let snapshot;
    if (isLikeDesc) {
      snapshot = await getDocs(
        getSearchQuery(true, "desc", getTimeDepth("allTime"), null, 5)
      );
    } else {
      snapshot = await getDocs(
        getSearchQuery(false, "desc", getTimeDepth("allTime"), null, 5)
      );
    }
    if (snapshot) {
      snapshot.forEach((doc) => {
        const postObj = {
          ...doc.data(),
          id: doc.id,
        };
        setPostList((prev) => [...prev, postObj]);
      });
    }
  };

  const MoreButtonClick = () => {
    if (isLikeDesc) {
      navigate("/board?sort=like_count");
      setIsUpdatePostList((prev) => ({ ...prev, popularPage: false }));
    } else {
      navigate("/board?sort=latest");
      setIsUpdatePostList((prev) => ({ ...prev, newestPage: false }));
    }
  };

  useEffect(() => {
    setPostList([]);
    getFivePost();
    //eslint-disable-next-line
  }, []);
  return (
    <PostBoxStyle isLikeDesc={isLikeDesc}>
      <PostBoxTitle>
        {isLikeDesc ? "인기 고민 포스트" : "최신 고민 포스트"}
      </PostBoxTitle>
      {postList.length !== 0 ? (
        postList.map((post) => (
          <PostElement key={post.id} post={post}></PostElement>
        ))
      ) : (
        <div>잠시만 기다려 주세요</div>
      )}
      <PostMoreBox>
        <PostMoreLink onClick={MoreButtonClick}>더보기</PostMoreLink>
      </PostMoreBox>
    </PostBoxStyle>
  );
};

export default PostBox;

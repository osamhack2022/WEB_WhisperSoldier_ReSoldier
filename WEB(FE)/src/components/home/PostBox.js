import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { getSearchQuery } from "../../modules/GetSearchQuery";
import getTimeDepth from "../../modules/GetTimeDepth";
import { IsUpdatePostList } from "../../store/PostStore";
import { InfoTextBox } from "../../styles/admin/ReportedPostStyle";
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
  const [isLoading, setLoading] = useState(true);
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
    setLoading(false);
  };

  const MoreButtonClick = () => {
    if (isLikeDesc) {
      navigate("/board?sort=like_count");
      setIsUpdatePostList((prev) => ({
        ...prev,
        popularPage: true,
        newestPage: true,
      }));
    } else {
      navigate("/board?sort=latest");
      setIsUpdatePostList((prev) => ({
        ...prev,
        popularPage: true,
        newestPage: true,
      }));
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
      {isLoading ? (
        <InfoTextBox>잠시만 기다려주세요</InfoTextBox>
      ) : postList.length !== 0 ? (
        <>
          {postList.map((post) => (
            <PostElement key={post.id} post={post}></PostElement>
          ))}
          <PostMoreBox>
            <PostMoreLink onClick={MoreButtonClick}>더보기</PostMoreLink>
          </PostMoreBox>
        </>
      ) : (
        <InfoTextBox>포스트가 존재하지 않습니다</InfoTextBox>
      )}
    </PostBoxStyle>
  );
};

export default PostBox;

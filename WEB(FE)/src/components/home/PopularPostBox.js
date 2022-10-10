import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getSearchQuery } from "../../modules/GetSearchQuery";
import getTimeDepth from "../../modules/GetTimeDepth";
import media from "../../modules/MediaQuery";
import PostElement from "../post/PostElement";

const PopularPostBoxStlye = styled.div`
  margin-left: 10px;
  position: relative;
  padding: 0px 20px 0px 20px;
  height: fit-content;
  flex-grow: 0.5;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
  width: 350px;
  ${media.tablet`
      width : 40%;
    `}
  ${media.mobile`
     width : 100%;
    margin: 10px 0px 0px 0px;
`}
`;

const PostBoxTitle = styled.div`
  font-size: 14x;
  width: 100%;
  margin-top: 10px;
  padding-bottom: 10px;
  text-align: left;
  letter-spacing: 0.64px;
  flex-grow: 1;
  color: #0d552c;
  background-color: rgba(0, 0, 0, 0);
  font-weight: 600;
  border-bottom: 1px solid #dcdcdc;
`;

const PostMoreBox = styled.div`
  width: 100%;
  margin-top: 10px;
  padding-bottom: 10px;
  text-align: center;
  letter-spacing: 0.64px;
  color: #000000;
  background-color: rgba(0, 0, 0, 0);
  font-weight: 500;
`;

const PostMoreLink = styled(Link)`
  font-size: 14x;
  padding-bottom: 10px;
  text-align: center;
  text-decoration: none;
  letter-spacing: 0.64px;
  color: #000000;
  background-color: rgba(0, 0, 0, 0);
  font-weight: 500;
`;

const PopularPostBox = () => {
  const [postList, setPostList] = useState([]);

  const getPoplularFivePost = async () => {
    const snapshot = await getDocs(
      getSearchQuery(true, "desc", getTimeDepth("allTime"), null, 5)
    );

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

  useEffect(() => {
    setPostList([]);
    getPoplularFivePost();
  }, []);
  return (
    <PopularPostBoxStlye>
      <PostBoxTitle>인기 고민 포스트</PostBoxTitle>
      {postList.length !== 0 ? (
        postList.map((post) => (
          <PostElement key={post.id} post={post}></PostElement>
        ))
      ) : (
        <div>잠시만 기다려 주세요</div>
      )}
      <PostMoreBox>
        <PostMoreLink to="/board?sort=like_count">더보기</PostMoreLink>
      </PostMoreBox>
    </PopularPostBoxStlye>
  );
};

export default PopularPostBox;

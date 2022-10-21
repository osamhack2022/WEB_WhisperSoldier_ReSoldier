import { useEffect, useState } from "react";
import styled from "styled-components";
import { dbFunction } from "../../lib/FStore";
import { getSearchQuery } from "../../modules/GetSearchQuery";
import getTimeDepth from "../../modules/GetTimeDepth";
import PostElement from "../post/PostElement";

const RecentPostBox = styled.div`
  padding: 10px 20px 10px 20px;
  height: fit-content;
  width: inherit;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
`;

const PostBoxTitle = styled.div`
  font-size: 14px;
  width: 100%;
  margin-top: 5px;
  padding-bottom: 5px;
  text-align: left;
  letter-spacing: 0.64px;
  flex-grow: 1;
  color: #0d552c;
  background-color: rgba(0, 0, 0, 0);
  font-weight: 600;
  border-bottom: 1px solid #dcdcdc;
`;

const RecentPostContainer = () => {
  const [postList, setPostList] = useState([]);
  const { getDocs } = dbFunction;

  const getFivePost = async () => {
    let snapshot = await getDocs(
      getSearchQuery(false, "desc", getTimeDepth("allTime"), null, 5)
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
    getFivePost();
    //eslint-disable-next-line
  }, []);
  return (
    <RecentPostBox>
      <PostBoxTitle>최신 고민 포스트</PostBoxTitle>
      {postList.length !== 0 ? (
        postList.map((post) => (
          <PostElement
            key={post.id}
            post={post}
            nonAdditionalInfo={true}
          ></PostElement>
        ))
      ) : (
        <div>잠시만 기다려 주세요</div>
      )}
    </RecentPostBox>
  );
};

export default RecentPostContainer;

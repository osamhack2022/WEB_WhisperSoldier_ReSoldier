import { useEffect, useState } from "react";
import styled from "styled-components";
import { dbFunction } from "../../lib/FStore";
import { getSearchQuery } from "../../modules/GetSearchQuery";
import getTimeDepth from "../../modules/GetTimeDepth";

import { useSetRecoilState } from "recoil";
import calTimeToString from "../../modules/CalTime";
import { CurrentScrollPos, PostInfo } from "../../store/PostStore";
import {
  PostAdditionalInfoBox,
  PostElementTag,
  PostElementTime,
} from "../../styles/post/PostElementStyle";
import { Link } from "react-router-dom";
import { InfoTextBox } from "../../styles/admin/ReportedPostStyle";

const PostElementBox = styled.div`
  border-bottom: 1px solid #dcdcdc;
  padding: 7px 0px;
  margin: 3px 0px;
`;

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
  /* letter-spacing: 0.64px; */
  flex-grow: 1;
  color: #0d552c;
  background-color: rgba(0, 0, 0, 0);
  font-weight: 600;
  border-bottom: 1px solid #dcdcdc;
`;

const PostElementTitle = styled(Link)`
  font-size: 13px;
  text-align: left;
  text-decoration: none;
  /* letter-spacing: 0.56px; */
  color: #3f3f3f;
  font-weight: 400;
  height: fit-content;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-wrap;
`;

const PostElement = ({ post }) => {
  const setPostInfo = useSetRecoilState(PostInfo);
  const setCurrentScrollPos = useSetRecoilState(CurrentScrollPos);

  const onClick = (post) => {
    setPostInfo((prev) => ({
      ...prev,
      creator_id: post.creator_id,
      created_timestamp: post.created_timestamp.toDate().toLocaleString(),
      id: post.id,
      postContent: post.text,
      post_report: post.post_report,
      post_rep_accept: post.post_rep_accept,
      like_count: post.like_count,
      comment_count: post.comment_count,
      tag_name: post.tag_name,
    }));
    setCurrentScrollPos(window.scrollY);
    window.scrollTo(0, 0);
  };
  return (
    <PostElementBox>
      <PostElementTitle to={`/post/${post.id}`} onClick={() => onClick(post)}>
        {!post.post_rep_accept ? post.text : "블라인드된 포스트입니다."}
      </PostElementTitle>

      <PostAdditionalInfoBox>
        <PostElementTime>
          {calTimeToString(post.created_timestamp)}{" "}
        </PostElementTime>
        <PostElementTag>
          {post.tag_name && !post.post_rep_accept && `#${post.tag_name}`}
        </PostElementTag>
      </PostAdditionalInfoBox>
    </PostElementBox>
  );
};

const RecentPostContainer = () => {
  const [postList, setPostList] = useState([]);
  const [isLoading, setLoading] = useState(true);
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
    setLoading(false);
  };

  useEffect(() => {
    setPostList([]);
    getFivePost();
    //eslint-disable-next-line
  }, []);
  return (
    <RecentPostBox>
      <PostBoxTitle>최신 고민 포스트</PostBoxTitle>
      {isLoading ? (
        <InfoTextBox>잠시만 기다려 주새요</InfoTextBox>
      ) : postList.length !== 0 ? (
        postList.map((post) => (
          <PostElement key={post.id} post={post}></PostElement>
        ))
      ) : (
        <InfoTextBox>포스트가 존재하지 않습니다.</InfoTextBox>
      )}
    </RecentPostBox>
  );
};

export default RecentPostContainer;

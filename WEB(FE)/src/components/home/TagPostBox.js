import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetTagQuery } from "../../modules/GetTagQuery";
import getTimeDepth from "../../modules/GetTimeDepth";
import { InfoTextBox } from "../../styles/admin/ReportedPostStyle";
import {
  PostBoxStyle,
  PostBoxTitle,
  PostMoreBox,
  PostMoreLink,
} from "../../styles/home/PostBoxStyle";
import PostElement from "../post/PostElement";

const TagPostBox = ({ isLikeDesc, bottombox, tagList, first }) => {
  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getFiveTagPost = async (tag_name) => {
    const snapshot = await getDocs(
      GetTagQuery(
        "WorryPost",
        "created_timestamp",
        "desc",
        "tag_name",
        "==",
        tag_name,
        5,
        null,
        getTimeDepth("allTime")
      )
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

  const MoreButtonClick = () => {
    navigate(`/tag/${first ? tagList[0].id : tagList[1].id}`);
  };

  useEffect(() => {
    setPostList([]);
    if (first) {
      getFiveTagPost(tagList[0].tag_name);
    } else {
      getFiveTagPost(tagList[1].tag_name);
    }
    //eslint-disable-next-line
  }, []);

  return (
    <PostBoxStyle isLikeDesc={isLikeDesc} bottombox={bottombox}>
      <PostBoxTitle>
        #{first ? tagList[0].tag_name : tagList[1].tag_name} 포스트
      </PostBoxTitle>
      {isLoading ? (
        <InfoTextBox>잠시만 기다려주세요</InfoTextBox>
      ) : postList.length !== 0 ? (
        <>
          {postList.map((post) => (
            <PostElement key={post.id} post={post} postBox={true}></PostElement>
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

export default TagPostBox;

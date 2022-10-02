import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import calTimeToString from "../../modules/CalTime";
import { PostInfo } from "../../store/PostStore";

const PostElementBox = styled.div`
  border-bottom: 1px solid #dcdcdc;
  padding: 10px 0px;
  margin: 0px;
`;

const PostElementTitle = styled(Link)`
  font-size: 14px;
  text-align: left;
  text-decoration: none;
  letter-spacing: 0.56px;
  color: #3f3f3f;
  font-weight: 500;
  height: 44px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-wrap;
`;

const PostElementTime = styled.div`
  font-size: 12px;
  text-align: left;
  letter-spacing: 0.48px;
  color: #bdbdbd;
  font-weight: 400;
`;

const PostElement = ({ post }) => {
  const [postInfo, setPostInfo] = useRecoilState(PostInfo);

  const onClick = (post) => {
    setPostInfo((prev) => ({
      ...prev,
      creator_id: post.creator_id,
      created_timestamp: post.created_timestamp.toDate().toLocaleString(),
      id: post.id,
      postContent: post.text,
    }));
    window.scrollTo(0, 0);
  };
  return (
    <PostElementBox>
      <PostElementTitle to={`/post/${post.id}`} onClick={() => onClick(post)}>
        {post.text}
      </PostElementTitle>
      <PostElementTime>
        {calTimeToString(post.created_timestamp)}
      </PostElementTime>
    </PostElementBox>
  );
};

export default PostElement;

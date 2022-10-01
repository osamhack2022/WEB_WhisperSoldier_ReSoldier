import { Link } from "react-router-dom";
import styled from "styled-components";
import calTimeToString from "../../modules/CalTime";

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
  height: 28px;
`;

const PostElementTime = styled.div`
  font-size: 12px;
  text-align: left;
  letter-spacing: 0.48px;
  color: #bdbdbd;
  font-weight: 400;
`;

const PostElement = ({ post }) => {
  return (
    <PostElementBox>
      <PostElementTitle to={`/post/${post.id}`}>{post.text}</PostElementTitle>
      <PostElementTime>
        {calTimeToString(post.created_timestamp)}
      </PostElementTime>
    </PostElementBox>
  );
};

export default PostElement;

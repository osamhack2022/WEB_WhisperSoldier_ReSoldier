import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import calTimeToString from "../../modules/CalTime";
import { CurrentScrollPos, PostInfo } from "../../store/PostStore";

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
  const setPostInfo = useSetRecoilState(PostInfo);
  const setCurrentScrollPos = useSetRecoilState(CurrentScrollPos);

  const onClick = (post) => {
    setPostInfo((prev) => ({
      ...prev,
      creator_id: post.creator_id,
      created_timestamp: post.created_timestamp.toDate().toLocaleString(),
      id: post.id,
      postContent: post.text,
      like_count: post.like_count,
    }));
    setCurrentScrollPos(window.scrollY);
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
      <div>
        <img
          src="https://blog.kakaocdn.net/dn/MycgT/btrD4WknzEo/6VdswUypGe0QlvCFeiUYpk/img.png"
          width="20px"
          alt="공감 아이콘"
        />
        {post.like_count}
      </div>
    </PostElementBox>
  );
};
export default PostElement;

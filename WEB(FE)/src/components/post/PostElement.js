import { useSetRecoilState } from "recoil";
import calTimeToString from "../../modules/CalTime";
import { CurrentScrollPos, PostInfo } from "../../store/PostStore";
import {
  PostAdditionalInfoBox,
  PostElementBox,
  PostElementCommentCount,
  PostElementInfoBox,
  PostElementLikeCount,
  PostElementTag,
  PostElementTime,
  PostElementTitle,
} from "../../styles/post/PostElementStyle";

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
      comment_count: post.comment_count,
      tag_name: post.tag_name,
    }));
    setCurrentScrollPos(window.scrollY);
    window.scrollTo(0, 0);
  };
  return (
    <PostElementBox>
      <PostElementTitle to={`/post/${post.id}`} onClick={() => onClick(post)}>
        {post.text}
      </PostElementTitle>
      <PostElementInfoBox>
        <PostElementLikeCount>{post.like_count}</PostElementLikeCount>
        <PostElementCommentCount>
          {post.comment_count ? post.comment_count : "0"}
        </PostElementCommentCount>
        <div>
          {post.tag_name!=="" ? `#${post.tag_name}` : null}
        </div>
      </PostElementInfoBox>
      <PostAdditionalInfoBox>
        <PostElementTime>
          {calTimeToString(post.created_timestamp)}{" "}
          {post.like_timestamp &&
            " | " + calTimeToString(post.like_timestamp) + "에 공감했습니다"}
        </PostElementTime>
        <PostElementTag>{post.tag_name && `#${post.tag_name}`}</PostElementTag>
      </PostAdditionalInfoBox>
    </PostElementBox>
  );
};
export default PostElement;

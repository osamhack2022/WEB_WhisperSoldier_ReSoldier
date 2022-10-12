import calTimeToString from "../../modules/CalTime";
import {
  PostElementBox,
  PostElementInfoBox,
  PostElementLikeCount,
  PostElementTime,
  PostElementTitle,
} from "../../styles/post/PostElementStyle";

const CommentElement = ({ comment }) => {
  const onClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <PostElementBox>
      <PostElementTitle
        to={`/post/${comment.associated_post_id}`}
        onClick={onClick}
      >
        {comment.comment_text}
      </PostElementTitle>
      <PostElementInfoBox>
        <PostElementLikeCount>{comment.like_count}</PostElementLikeCount>
      </PostElementInfoBox>
      <PostElementTime>
        {calTimeToString(comment.created_timestamp)}
      </PostElementTime>
    </PostElementBox>
  );
};

export default CommentElement;

import { useEffect } from "react";
import { authService } from "../../lib/FAuth";
import styled from "styled-components";
import PostCommentElement from "./PostCommentElement";
const PostCommentBox = styled.div`
  margin: 10px 0px 0px 10px;
  padding: 10px 20px;
  height: fit-content;
  width: 45vw;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
`;
const PostCommentContent = ({ getPostComments, postComments }) => {
  useEffect(() => {
    getPostComments();
    console.log(postComments);
  }, []);

  return (
    <PostCommentBox>
      <div>
        {postComments.map((comment) => (
          <PostCommentElement
            key={comment.id}
            commentElement={comment}
            isOwner={comment.commentor_id === authService.currentUser.uid}
            created_timestamp={comment.created_timestamp}
            getPostComments={getPostComments}
          ></PostCommentElement>
        ))}
      </div>
    </PostCommentBox>
  );
};

export default PostCommentContent;

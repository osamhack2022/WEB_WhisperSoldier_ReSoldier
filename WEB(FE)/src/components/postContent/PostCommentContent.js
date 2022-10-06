import { useEffect } from "react";
import { authService } from "../../lib/FAuth";
import styled from "styled-components";
import PostCommentElement from "./PostCommentElement";
const PostCommentBox = styled.div`
  margin: 10px 0px 0px 00px;
  padding: 10px 20px;
  width: 100%;
  height: fit-content;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
`;
const PostCommentContent = ({ getPostComments, postComments, isTablet }) => {
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
            isTablet={isTablet}
          ></PostCommentElement>
        ))}
      </div>
    </PostCommentBox>
  );
};

export default PostCommentContent;

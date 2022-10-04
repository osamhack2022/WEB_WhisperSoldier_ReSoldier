import styled from "styled-components";
import { useEffect, useState } from "react";
import PostCommentElement from "./PostCommentElement";
import { authService } from "../../lib/FAuth";

const PostCommentBox = styled.div`
  margin: 10px 0px 0px 10px;
  padding: 10px 20px;
  height: fit-content;
  width: 45vw;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
`;

const PostCommentContainer = ({
  postInfo,
  postComments,
  getPostComments,
}) => {
  
  useEffect(() => {
    getPostComments();
  }, []);
  
  return (
    <PostCommentBox>
      <div>
        {postComments.map(comment =>
          <PostCommentElement
            key={comment.id}
            commentElement={comment}
            isOwner={comment.commentor_id === authService.currentUser.uid}
            getPostComments={getPostComments}
            postInfo={postInfo}
          >
          </PostCommentElement>
        )}
      </div>
    </PostCommentBox>
  );
};

export default PostCommentContainer;
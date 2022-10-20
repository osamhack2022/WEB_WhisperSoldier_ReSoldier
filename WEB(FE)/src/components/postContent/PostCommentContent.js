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

const NoCommentText = styled.div`
  white-space: pre-wrap;
  font-size: 14px;
  text-align: center;
  letter-spacing: 0.56px;
  color: #1d1d1d;
  white-space: pre-wrap;
  font-weight: 400;
`;

const PostCommentContent = ({
  getPostComments,
  postComments,
  isTablet,
  setIsLoadingComments,
  isLoadingComments,
  isAdmin,
}) => {
  useEffect(() => {
    getPostComments();
    setIsLoadingComments(true);
  }, []);

  return (
    <PostCommentBox>
      {isLoadingComments ? (
        <NoCommentText>댓글 로딩 중...</NoCommentText>
      ) : postComments.length !== 0 ? (
        postComments.map((comment) => (
          <PostCommentElement
            key={comment.id}
            commentElement={comment}
            isOwner={comment.commentor_id === authService.currentUser.uid}
            created_timestamp={comment.created_timestamp}
            getPostComments={getPostComments}
            isTablet={isTablet}
            isAdmin={isAdmin}
          ></PostCommentElement>
        ))
      ) : (
        <NoCommentText>
          아직 댓글이 없습니다. <br />
          댓글을 작성해 고민 작성자에게 힘이 되어주세요!
        </NoCommentText>
      )}
    </PostCommentBox>
  );
};

export default PostCommentContent;

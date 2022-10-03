import styled from "styled-components";
import { useEffect, useState } from "react";


const PostCommentBox = styled.div`
  margin: 10px 0px 0px 10px;
  padding: 10px 20px;
  height: fit-content;
  width: 45vw;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
`;

const PostCommentElement = styled.div`
  white-space : pre-wrap;

`;

const PostCommentContainer = ({
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
          <PostCommentElement key={comment.id}>
            {comment.comment_text}
          <button>수정하기</button>
          <button>삭제하기</button>
          </PostCommentElement>
        )}
      </div>
    </PostCommentBox>
  );
};

export default PostCommentContainer;
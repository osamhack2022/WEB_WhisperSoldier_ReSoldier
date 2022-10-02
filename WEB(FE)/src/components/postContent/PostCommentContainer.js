import styled from "styled-components";

const PostCommentBox = styled.div`
  margin: 10px 0px 0px 10px;
  padding: 10px 20px;
  height: fit-content;
  width: 45vw;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
`;

const PostCommentContainer = () => {
  return (
    <PostCommentBox>
      <p>여기는 댓글이 추후에 구현될 공간</p>
    </PostCommentBox>
  );
};

export default PostCommentContainer;

import styled from "styled-components";

const PostBoardTitle = styled.span`
  font-size: 16px;
  text-align: center;
  letter-spacing: 0.64px;
  color: #000000;
  background-color: rgba(0, 0, 0, 0);
  font-weight: 700;
`;

const PostBoardTitleBox = styled.div`
  position: relative;
  padding: 10px 0px 0px 20px;
  height: 48px;
  width: inherit;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
`;

const PostBoardTitleContainer = ({ children }) => {
  return (
    <PostBoardTitleBox>
      <PostBoardTitle>{children}</PostBoardTitle>
    </PostBoardTitleBox>
  );
};

export default PostBoardTitleContainer;

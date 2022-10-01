import styled from "styled-components";

const PostBoardBodyBox = styled.div`
  margin-top: 10px;
  padding: 10px 20px;
  height: max-content;
  width: inherit;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
`;

const PostBoardBodyContainer = ({ children }) => {
  return <PostBoardBodyBox>{children}</PostBoardBodyBox>;
};

export default PostBoardBodyContainer;

import styled from "styled-components";

const MoreLoadPostButtonText = styled.div`
  font-size: 14px;
  text-align: center;
  letter-spacing: 0.64px;
  color: #000000;
  background-color: rgba(0, 0, 0, 0);
  font-weight: 400;
`;

const MoreLoadPostButtonBox = styled.div`
  margin-top: 10px;
  position: relative;
  padding: 10px 0px 0px 20px;
  height: 48px;
  width: inherit;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: beige;
  }
`;

const MoreLoadPostButton = ({ updatePostList }) => {
  return (
    <MoreLoadPostButtonBox onClick={updatePostList}>
      <MoreLoadPostButtonText>10개 더 보기</MoreLoadPostButtonText>
    </MoreLoadPostButtonBox>
  );
};

export default MoreLoadPostButton;

import { FiArrowDown } from "react-icons/fi";
import styled from "styled-components";

const MoreLoadPostButtonText = styled.div`
  font-size: 14px;
  text-align: center;
  letter-spacing: 0.64px;
  color: #000000;
  background-color: rgba(0, 0, 0, 0);
  font-weight: 400;
`;

const DownIcon = styled(FiArrowDown)`
  margin-left: 10px;
  font-size: 16px;
  color: #4f4f4f;
  transition: all 0.3s;
`;

const MoreLoadPostButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  height: 48px;
  width: inherit;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: #dcdcdc;
  }
`;

const MoreLoadPostButton = ({ updatePostList }) => {
  return (
    <MoreLoadPostButtonBox onClick={updatePostList}>
      <MoreLoadPostButtonText>포스트 10개 더 보기</MoreLoadPostButtonText>
      <DownIcon></DownIcon>
    </MoreLoadPostButtonBox>
  );
};

export default MoreLoadPostButton;

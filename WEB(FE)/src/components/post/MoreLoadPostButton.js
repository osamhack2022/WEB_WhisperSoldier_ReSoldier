import { FiArrowDown } from "react-icons/fi";
import styled from "styled-components";
import media from "../../modules/MediaQuery";

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
  margin-left : ${(props)=>(props.marginLeft ? "10px" : "0px")};
  &:hover {
    background-color: #dcdcdc;
  }
  ${media.mobile`
  margin-left: inherit;

  `}
`;

const MoreLoadPostButton = ({ updatePostList, isMarginLeft, isComment }) => {
  return (
    <MoreLoadPostButtonBox name="moreLoadPostButton" onClick={updatePostList} marginLeft={isMarginLeft}>
      <MoreLoadPostButtonText>{isComment?"댓글 10개 더 보기":"포스트 10개 더 보기"}</MoreLoadPostButtonText>
      <DownIcon></DownIcon>
    </MoreLoadPostButtonBox>
  );
};

export default MoreLoadPostButton;

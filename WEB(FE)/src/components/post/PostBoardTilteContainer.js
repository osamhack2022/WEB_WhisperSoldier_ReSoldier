import styled from "styled-components";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import media from "../../modules/MediaQuery";

const PostBoardTitle = styled.span`
  font-size: 14px;
  width: fit-content;
  text-align: left;
  flex-grow: 1;
  color: #000000;
  background-color: rgba(0, 0, 0, 0);
  font-weight: bold;
`;

const PostBoardTitleBox = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px 0px 20px;
  height: 48px;
  width: inherit;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
`;

export const PostBoardMoreButton = styled(FiArrowDown)`
  font-size: 16px;
  color: #4f4f4f;
  transition: all 0.3s;
  z-index: 2;
`;

export const PostBoardMoreUpButton = styled(FiArrowUp)`
  font-size: 16px;
  color: #4f4f4f;
  transition: all 0.3s;
  z-index: 2;
`;

export const PostBoardMoreButtonText = styled.span`
  margin-right: 5px;
  font-size: 12px;
  text-align: center;
  color: #4f4f4f;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0);
  font-weight: 600;
  transition: all 0.3s;
`;

export const PostBoardMoreButtonBox = styled.div`
  display: none;
  ${media.mobile`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    width: 90px;
    align-items: center;
    transition: all 0.3s;
    z-index: 2;
    cursor: pointer;
    &:hover
      ${PostBoardMoreButton},
      &:hover
      ${PostBoardMoreButtonText},
      &:hover
      ${PostBoardMoreUpButton} {
      color: #000000;
      transform: scale(1.05);
    }
  `}
`;

const PostBoardTitleContainer = ({
  children,
  onShowSideContainer,
  isShowContainer,
}) => {
  return (
    <PostBoardTitleBox>
      <PostBoardTitle>{children}</PostBoardTitle>
      <PostBoardMoreButtonBox onClick={onShowSideContainer}>
        <PostBoardMoreButtonText>검색 설정</PostBoardMoreButtonText>
        {!isShowContainer ? (
          <PostBoardMoreButton></PostBoardMoreButton>
        ) : (
          <PostBoardMoreUpButton></PostBoardMoreUpButton>
        )}
      </PostBoardMoreButtonBox>
    </PostBoardTitleBox>
  );
};

export default PostBoardTitleContainer;

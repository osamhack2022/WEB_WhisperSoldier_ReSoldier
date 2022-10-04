import styled from "styled-components";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";

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

const PostBoardMoreButton = styled(FiArrowDown)`
  font-size: 16px;
  color: #4f4f4f;
  transition: all 0.3s;
`;

const PostBoardMoreUpButton = styled(FiArrowUp)`
  font-size: 16px;
  color: #4f4f4f;
  transition: all 0.3s;
`;

const PostBoardMoreButtonText = styled.span`
  margin-right: 5px;
  font-size: 12px;
  text-align: center;
  letter-spacing: 0.64px;
  color: #4f4f4f;
  background-color: rgba(0, 0, 0, 0);
  font-weight: 700;
  transition: all 0.3s;
`;

const PostBoardMoreButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 5px 0px;
  text-decoration: none;
  height: 48px;
  align-items: center;
  transition: all 0.3s;
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
`;

const PostBoardTitleContainer = ({
  isDesktop,
  isTablet,
  children,
  onShowSideContainer,
  isShowContainer,
}) => {
  return (
    <PostBoardTitleBox>
      <PostBoardTitle>{children}</PostBoardTitle>
      {!isTablet && (
        <PostBoardMoreButtonBox onClick={onShowSideContainer}>
          <PostBoardMoreButtonText>검색 설정</PostBoardMoreButtonText>
          {!isShowContainer ? (
            <PostBoardMoreButton></PostBoardMoreButton>
          ) : (
            <PostBoardMoreUpButton></PostBoardMoreUpButton>
          )}
        </PostBoardMoreButtonBox>
      )}
    </PostBoardTitleBox>
  );
};

export default PostBoardTitleContainer;

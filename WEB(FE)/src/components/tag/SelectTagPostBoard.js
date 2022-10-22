import { Link } from "react-router-dom";
import styled from "styled-components";
import media from "../../modules/MediaQuery";
import { SideOptionContainer } from "../../styles/post/PostBoardStyle";
import { SideOptionFormForPostBoard } from "../common/SideOptionForm";
import MoreLoadPostButton from "../post/MoreLoadPostButton";
import PostBoardTitleContainer from "../post/PostBoardTilteContainer";
import PostElement from "../post/PostElement";

const TagBoardContainerBox = styled.div`
  margin: 0px auto;
  display: flex;
  width: 960px;
  flex-direction: row;
  ${media.smallDesktop`
  margin: inherit;
  width: inherit;
  padding: 0px 10vw;
  `}
  ${media.mobile`
  padding: 0px 5vw;
  flex-direction: column;
  `}
`;

const TagBoardContentContainer = styled.div`
  height: fit-content;
  flex-grow: 1;
  ${media.mobile`
  flex-grow: inherit;
  width: 100%;
  `}
`;

const TagPostBoardBodyBox = styled.div`
  margin-top: 10px;
  padding: 10px 20px;
  height: max-content;
  width: inherit;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
`;

const SelectTagPostBoard = ({
  selectedTag,
  tagPosts,
  isNextTagPostExist,
  moveNextTagPosts,
  orderDescOrAsc,
  timeDepthValue,
}) => {
  return (
    <TagBoardContainerBox>
      <TagBoardContentContainer>
        <PostBoardTitleContainer
        // onShowSideContainer={onShowSideContainer}
        // isShowContainer={isShowContainer}
        >
          {`#${selectedTag} 고민 게시판`}
        </PostBoardTitleContainer>
        <TagPostBoardBodyBox>
          {selectedTag === "" && <>태그를 선택해 주세요</>}
          {selectedTag !== "" && tagPosts.length === 0 ? (
            <div>
              포스트를 불러오는 중이거나 해당 태그의 포스트가 존재하지 않습니다.
            </div>
          ) : (
            tagPosts.map((tagpost) => (
              <PostElement key={tagpost.id} post={tagpost}></PostElement>
            ))
          )}
        </TagPostBoardBodyBox>

        {isNextTagPostExist && selectedTag !== "" && (
          <MoreLoadPostButton
            updatePostList={() =>
              moveNextTagPosts(selectedTag, orderDescOrAsc, timeDepthValue)
            }
          >
            10개 더 보기
          </MoreLoadPostButton>
        )}
      </TagBoardContentContainer>
      <SideOptionContainer>
        {/* <SideOptionFormForPostBoard
        // onSearchSubmit={onSearchSubmit}
        // setTimeDepthValue={setTimeDepthValue}
        // timeDepthSelect={timeDepthSelect}
        // setTimeDepthSelect={setTimeDepthSelect}
        // isResultDesc={isResultDesc}
        // setIsResultDesc={setIsResultDesc}
        // setOrderDescOrAsc={setOrderDescOrAsc}
        ></SideOptionFormForPostBoard> */}
      </SideOptionContainer>
    </TagBoardContainerBox>
  );
};

export default SelectTagPostBoard;

import { useCallback, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { TabletQuery } from "../../lib/Const";
import { SideOptionContainer } from "../../styles/post/PostBoardStyle";
import {
  SearchBarInSearchPage,
  SearchContainerBox,
  SearchContentBox,
} from "../../styles/search/SearchContainerStyle";
import { SideOptionFormForPostBoard } from "../common/SideOptionForm";
import MoreLoadPostButton from "../post/MoreLoadPostButton";
import PostBoardBodyContainer from "../post/PostBoardBodyContainer";
import PostBoardTitleContainer from "../post/PostBoardTilteContainer";
import PostElement from "../post/PostElement";

const SearchContainer = ({
  onSearchSubmit,
  searchInput,
  isInputError,
  currentSearchKeyword,
  onSearchInputChange,
  isSearching,
  countResult,
  searchResults,
  isNextResultExist,
  onClick,
  onKeyUp,
  setTimeDepthValue,
  timeDepthSelect,
  setTimeDepthSelect,
  isResultDesc,
  setIsResultDesc,
  setOrderDescOrAsc,
}) => {
  const isTablet = useMediaQuery({ query: TabletQuery });

  const [isShowContainer, setIsShowContainer] = useState(false);
  const onShowSideContainer = useCallback(() => {
    setIsShowContainer((prev) => !prev);
  }, []);

  console.log("[SearchContainer.js]", timeDepthSelect, isResultDesc);

  return (
    <SearchContainerBox>
      <SearchBarInSearchPage
        searchInput={searchInput}
        onSearchInputChange={onSearchInputChange}
        onSearchSubmit={onSearchSubmit}
        onKeyUp={onKeyUp}
        isInputError={isInputError}
      ></SearchBarInSearchPage>
      <SearchContentBox>
        <PostBoardTitleContainer
          onShowSideContainer={onShowSideContainer}
          isShowContainer={isShowContainer}
        >
          <div>
            "{currentSearchKeyword}" 검색 결과 {countResult}개 중{" "}
            {searchResults.length}개 고민 포스트 표시
          </div>
        </PostBoardTitleContainer>
        {!isTablet && isShowContainer && (
          <SideOptionContainer>
            <SideOptionFormForPostBoard></SideOptionFormForPostBoard>
          </SideOptionContainer>
        )}

        <PostBoardBodyContainer>
          {searchResults.map((result) => (
            <PostElement key={result.id} post={result}></PostElement>
          ))}
          {!isNextResultExist && "검색 결과 마지막입니다."}
          {searchResults.length === 0 && isSearching && "검색결과가 없습니다."}
        </PostBoardBodyContainer>
        {isNextResultExist && (
          <MoreLoadPostButton updatePostList={onClick}>
            10개 더보기
          </MoreLoadPostButton>
        )}
      </SearchContentBox>
      {isTablet && (
        <SideOptionContainer>
          <SideOptionFormForPostBoard
            onSearchSubmit={onSearchSubmit}
            setTimeDepthValue={setTimeDepthValue}
            timeDepthSelect={timeDepthSelect}
            setTimeDepthSelect={setTimeDepthSelect}
            isResultDesc={isResultDesc}
            setIsResultDesc={setIsResultDesc}
            setOrderDescOrAsc={setOrderDescOrAsc}
          ></SideOptionFormForPostBoard>
        </SideOptionContainer>
      )}
    </SearchContainerBox>
  );
};

export default SearchContainer;

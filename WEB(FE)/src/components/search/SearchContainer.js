import { Link } from "react-router-dom";
import styled from "styled-components";
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
  onSearchInputChange,
  isSearching,
  countResult,
  searchResults,
  isNextResultExist,
  onClick,
  isDesktop,
  isTablet,
  onSelectWeek,
  onSelectMonth,
  onSelectHalfYear,
  onSelectFullYear,
  onSelectAllTime,
  timeDepthSelect,
  onSelectDesc,
  onSelectAsc,
  isResultDesc,
  firstSearchResult,
}) => {
  return (
    <SearchContainerBox isDesktop={isDesktop} isTablet={isTablet}>
      <SearchBarInSearchPage  isDesktop={isDesktop} isTablet={isTablet} searchInput={searchInput} onSearchInputChange={onSearchInputChange} onSearchSubmit={onSearchSubmit}>

</SearchBarInSearchPage>
      <SearchContentBox>
        <PostBoardTitleContainer isDesktop={isDesktop} isTablet={isTablet}>
          <div>
            "{searchInput}" 검색 결과 {countResult}개 중 {searchResults.length}
            개 고민 표시
          </div>
        </PostBoardTitleContainer>

        <PostBoardBodyContainer>
          {searchResults.map((result) => (
            <PostElement key={result.id} post={result}></PostElement>
          ))}
          {!isNextResultExist && "검색 결과 마지막입니다."}
          {searchResults.length === 0 && isSearching && "검색결과가 없습니다."}
        </PostBoardBodyContainer>
        {isNextResultExist && (
          <MoreLoadPostButton name="moreLoadPostButton" updatePostList={onClick}>
            10개 더보기
          </MoreLoadPostButton>
        )}
      </SearchContentBox>
      {isTablet && (
        <SideOptionContainer isDesktop={isDesktop} isTablet={isTablet}>
          <SideOptionFormForPostBoard 
            onSelectWeek={onSelectWeek}
            onSelectMonth={onSelectMonth}
            onSelectHalfYear={onSelectHalfYear}
            onSelectFullYear={onSelectFullYear}
            onSelectAllTime={onSelectAllTime}
            timeDepthSelect={timeDepthSelect}
            onSelectDesc={onSelectDesc}
            onSelectAsc={onSelectAsc}
            isResultDesc={isResultDesc}
            firstSearchResult={firstSearchResult}
            onSearchSubmit={onSearchSubmit}
          ></SideOptionFormForPostBoard>
        </SideOptionContainer>
      )}
    </SearchContainerBox>
  );
};

export default SearchContainer;

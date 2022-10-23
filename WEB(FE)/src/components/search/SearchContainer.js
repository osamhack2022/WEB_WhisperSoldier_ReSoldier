import { useCallback, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { TabletQuery } from "../../lib/Const";
import { useAndSetForm } from "../../modules/useForm";
import { SideOptionContainer } from "../../styles/post/PostBoardStyle";
import {
  SearchContainerBox,
  SearchContentBox,
} from "../../styles/search/SearchContainerStyle";
import SearchSection from "../common/SearchSection";
import { SideOptionFormForPostBoard } from "../common/SideOptionForm";
import MoreLoadPostButton from "../post/MoreLoadPostButton";
import PostBoardBodyContainer from "../post/PostBoardBodyContainer";
import PostBoardTitleContainer from "../post/PostBoardTilteContainer";
import PostElement from "../post/PostElement";

const SearchContainer = ({
  onSearchSubmit,
  currentSearchKeyword,
  countResult,
  currentSearchCount,
  searchResults,
  isNextResultExist,
  setTimeDepthValue,
  timeDepthSelect,
  setTimeDepthSelect,
  isResultDesc,
  setIsResultDesc,
  setOrderDescOrAsc,
  isLoading,
  searchKeyword,
}) => {
  const isTablet = useMediaQuery({ query: TabletQuery });
  const navigate = useNavigate();
  const [inputValue, setInputChange, onChange] = useAndSetForm({
    searchWord: "",
  });

  const [isShowContainer, setIsShowContainer] = useState(false);
  const onShowSideContainer = useCallback(() => {
    setIsShowContainer((prev) => !prev);
  }, []);

  const onMoreSearchPost = async (e) => {
    e.preventDefault();
    await searchKeyword(10, false);
  };

  return (
    <SearchContainerBox>
      {!isTablet && (
        <SearchSection
          navigate={navigate}
          inputValue={inputValue}
          onChange={onChange}
          searchpage="true"
        ></SearchSection>
      )}
      <SearchContentBox>
        <PostBoardTitleContainer
          onShowSideContainer={onShowSideContainer}
          isShowContainer={isShowContainer}
        >
          '{currentSearchKeyword}' 검색 결과 : {countResult}중{" "}
          {currentSearchCount}개의 고민 포스트
        </PostBoardTitleContainer>
        {!isTablet && isShowContainer && (
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

        <PostBoardBodyContainer>
          {searchResults.map((result) => (
            <PostElement key={result.id} post={result}></PostElement>
          ))}
          {isLoading
            ? "잠시만 기다려주세요"
            : searchResults.length === 0 &&
              `'${currentSearchKeyword}'에 대한 검색결과가 없습니다.`}
        </PostBoardBodyContainer>
        {!isLoading && isNextResultExist && (
          <MoreLoadPostButton updatePostList={onMoreSearchPost}>
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

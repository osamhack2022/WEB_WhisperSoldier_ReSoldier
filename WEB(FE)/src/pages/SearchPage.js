import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import SearchContainer from "../components/search/SearchContainer";
import { getSearchQuery, getTimeDepthObj } from "../modules/GetSearchQuery";
import getTimeDepth from "../modules/GetTimeDepth";
import { IsUpdatePostList } from "../store/PostStore";
import { ResultList, SearchInfo } from "../store/SearchStore";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchInfo, setSearchInfo] = useRecoilState(SearchInfo);
  const [resultList, setResultList] = useRecoilState(ResultList);
  const [isUpdatePostList, setIsUpdatePostList] =
    useRecoilState(IsUpdatePostList);

  const [isLoading, setLoading] = useState(true);
  const [isShowMobileContent, setShowMobileContent] = useState(false);

  const [currentSearchKeyword, setCurrentSearchKeyword] = useState("");

  const [searchResults, setSearchResults] = useState([]);
  const [countResult, setCountResult] = useState(0);
  const [nextResultSnapshot, setNextPostSnapShot] = useState({});
  const [isNextResultExist, setIsNextResultExist] = useState(true);
  const [currentSearchCount, setCurrentSearchCount] = useState(0);

  const [timeDepthValue, setTimeDepthValue] = useState("week");
  const [timeDepthSelect, setTimeDepthSelect] = useState({
    week: true,
    month: false,
    halfYear: false,
    fullYear: false,
    allTime: false,
  });
  const [isResultDesc, setIsResultDesc] = useState(true);
  const [orderDescOrAsc, setOrderDescOrAsc] = useState("desc");

  const searchKeyword = async (countSearchPost, firstSearch) => {
    let snapshot;
    const keyword = searchParams.get("keyword");

    if (firstSearch) {
      snapshot = await getDocs(
        getSearchQuery(false, orderDescOrAsc, getTimeDepth(timeDepthValue))
      );
    } else {
      snapshot = await getDocs(
        getSearchQuery(
          false,
          orderDescOrAsc,
          getTimeDepth(timeDepthValue),
          nextResultSnapshot
        )
      );
    }

    if (snapshot && snapshot.docs.length !== 0) {
      let count = 0;
      let totalCount = 0;

      for (let i = 0; i < snapshot.docs.length; i++) {
        const postObj = { ...snapshot.docs[i].data(), id: snapshot.docs[i].id };
        const postTextToBeChecked = String(postObj.text);

        if (postTextToBeChecked.includes(keyword)) {
          if (count < countSearchPost) {
            setSearchResults((prev) => [...prev, postObj]);
            setResultList((prev) => [...prev, postObj]);
            count += 1;
            totalCount += 1;
          } else if (count === countSearchPost) {
            count += 1;
            totalCount += 1;
            setNextPostSnapShot(snapshot.docs[i - 1]);
          } else {
            totalCount += 1;
          }
        }
      }
      if (count > countSearchPost) {
        count -= 1;
      }
      if (totalCount <= countSearchPost) {
        setIsNextResultExist(false);
      } else {
        setIsNextResultExist(true);
      }
      if (firstSearch) {
        setCountResult(totalCount);
      }

      if (firstSearch) {
        setSearchInfo((prev) => ({
          ...prev,
          searchKeyword: keyword,
          countResultPosts: totalCount,
          currentCountPosts: count,
          isExistNextSearchResult: isNextResultExist,
          timeSettingValue: timeDepthValue,
          descSettingValue: isResultDesc,
        }));
      } else {
        setSearchInfo((prev) => ({
          ...prev,
          currentCountPosts: currentSearchCount + count,
          isExistNextSearchResult: isNextResultExist,
          timeSettingValue: timeDepthValue,
          descSettingValue: isResultDesc,
        }));
      }
      setCurrentSearchCount((prev) => prev + count);
    } else {
      setIsNextResultExist(false);
    }

    setLoading(false);
  };

  const recoverSnapshot = async () => {
    let snapshot = await getDocs(
      getSearchQuery(
        false,
        searchInfo.descSettingValue ? "desc" : "asc",
        getTimeDepth(searchInfo.timeSettingValue)
      )
    );

    if (snapshot) {
      let count = 0;
      let totalCount = 0;

      for (let i = 0; i < snapshot.docs.length; i++) {
        const postObj = { ...snapshot.docs[i].data(), id: snapshot.docs[i].id };
        const postTextToBeChecked = String(postObj.text);
        if (postTextToBeChecked.includes(searchInfo.searchKeyword)) {
          if (count < resultList.length) {
            count += 1;
            totalCount += 1;
          } else if (count === resultList.length) {
            count += 1;
            totalCount += 1;
            setNextPostSnapShot((prev) => snapshot.docs[i - 1]);
          } else {
            totalCount += 1;
          }
        }
      }
      count -= 1;
      if (totalCount <= resultList.length) {
        setIsNextResultExist(false);
      } else {
        setIsNextResultExist(true);
      }
      setSearchInfo((prev) => ({
        ...prev,
        isExistNextSearchResult: isNextResultExist,
      }));
    } else {
      setIsNextResultExist(false);
    }
    setLoading(false);
  };

  const onSearchSubmit = async (e) => {
    e.preventDefault();
    const currentKeyword = searchParams.get("keyword");
    if (currentKeyword) {
      setSearchResults([]);
      setResultList([]);
      setCurrentSearchCount(0);
      searchKeyword(10, true);
      setCurrentSearchKeyword(currentKeyword);
    } else {
      navigate("/notfound", { replace: true });
    }
  };

  useEffect(() => {
    setLoading(true);

    const currentKeyword = searchParams.get("keyword");

    if (currentKeyword) {
      //param 값 (키워드)에 대해 포스트 검색
      if (
        searchInfo.searchKeyword === currentKeyword &&
        resultList.length > 0 &&
        !isUpdatePostList.searchPage
      ) {
        setCurrentSearchCount(searchInfo.currentCountPosts);
        setCurrentSearchKeyword(currentKeyword);
        setTimeDepthValue(searchInfo.timeSettingValue);
        setTimeDepthSelect(getTimeDepthObj(searchInfo.timeSettingValue));
        setIsResultDesc(searchInfo.descSettingValue);
        setOrderDescOrAsc(searchInfo.descSettingValue ? "desc" : "asc");
        setSearchResults(resultList);
        setCountResult(searchInfo.countResultPosts);
        recoverSnapshot();
      } else {
        setSearchResults([]);
        setResultList([]);
        setCurrentSearchCount(0);
        searchKeyword(10, true);
        setCurrentSearchKeyword(currentKeyword);
        setIsUpdatePostList((prev) => ({ ...prev, searchPage: false }));
      }
    } else {
      // param 값이 null인 경우 오류 페이지로 이동
      navigate("/notfound", { replace: true });
    }
    // eslint-disable-next-line
  }, [searchParams.get("keyword")]);

  return (
    <>
      <Helmet>
        <title>검색 - Whisper Soldier</title>
      </Helmet>
      <SearchContainer
        onSearchSubmit={onSearchSubmit}
        currentSearchKeyword={currentSearchKeyword}
        countResult={countResult}
        currentSearchCount={currentSearchCount}
        searchResults={searchResults}
        isNextResultExist={isNextResultExist}
        setTimeDepthValue={setTimeDepthValue}
        timeDepthSelect={timeDepthSelect}
        setTimeDepthSelect={setTimeDepthSelect}
        isResultDesc={isResultDesc}
        setIsResultDesc={setIsResultDesc}
        setOrderDescOrAsc={setOrderDescOrAsc}
        isLoading={isLoading}
        searchKeyword={searchKeyword}
        isShowMobileContent={isShowMobileContent}
        setShowMobileContent={setShowMobileContent}
      ></SearchContainer>
    </>
  );
};

export default SearchPage;

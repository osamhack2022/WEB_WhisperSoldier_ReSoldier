import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import SearchContainer from "../components/search/SearchContainer";
import { getSearchQuery, getTimeDepthObj } from "../modules/GetSearchQuery";
import getTimeDepth from "../modules/GetTimeDepth";
import { useAndSetForm } from "../modules/useForm";
import { IsUpdatePostList } from "../store/PostStore";
import { ResultList, SearchInfo } from "../store/SearchStore";

const SearchPage = () => {
  const [searchInfo, setSearchInfo] = useRecoilState(SearchInfo);
  const [resultList, setResultList] = useRecoilState(ResultList);
  const [isUpdatePostList, setIsUpdatePostList] =
    useRecoilState(IsUpdatePostList);

  const [notSearch, setNotSearch] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const [inputValue, setInputChange, onChange] = useAndSetForm({
    searchInput: "",
  });
  const [isInputError, setIsInputError] = useState(false);
  const [currentSearchKeyword, setCurrentSearchKeyword] = useState("");

  const [searchResults, setSearchResults] = useState([]);
  const [countResult, setCountResult] = useState(0);
  const [nextResultSnapshot, setNextPostSnapShot] = useState({});
  const [isNextResultExist, setIsNextResultExist] = useState(true);
  const [currentSearchCount, setCurrentSearchCount] = useState(0);
  /*
  const [sortOption, setSortOption] = useState({
    timeDepthValue: "week",
    order: "desc",
  });*/
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

  const onSearchSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.searchInput.length !== 0) {
      setNotSearch(false);
      setLoading(true);
      setSearchResults([]);
      setResultList([]);
      setCurrentSearchCount(0);
      searchKeyWord(10, true);
      setCurrentSearchKeyword(inputValue.searchInput);
    } else {
      setIsInputError(true);
      setTimeout(() => {
        setIsInputError(false);
      }, 2000);
    }
  };

  const onKeyUp = (e) => {
    if (e.key === "Enter") {
      if (inputValue.searchInput.length !== 0) {
        setNotSearch(false);
        setLoading(true);
        setSearchResults([]);
        setResultList([]);
        setCurrentSearchCount(0);
        searchKeyWord(10, true);
        setCurrentSearchKeyword(inputValue.searchInput);
      } else {
        setIsInputError(true);
        setTimeout(() => {
          setIsInputError(false);
        }, 2000);
      }
    }
  };
  /*
  const onSearchInputChange = (e) => {
    const {
      target: { value },
    } = e;
    setSearchInput(value);
  };
*/
  const searchKeyWord = async (
    countSearchPost,
    firstSearch = false,
    updateKeyword = null
  ) => {
    /*현재 최신 post 순으로 정렬된 결과를 보여준다. */
    let snapshot;
    let keyword;
    if (updateKeyword) {
      keyword = updateKeyword;
    } else {
      keyword = inputValue.searchInput;
    }
    if (firstSearch) {
      snapshot = await getDocs(
        getSearchQuery(false, orderDescOrAsc, getTimeDepth(timeDepthValue))
      );
    } else {
      console.log(nextResultSnapshot);
      snapshot = await getDocs(
        getSearchQuery(
          false,
          orderDescOrAsc,
          getTimeDepth(timeDepthValue),
          nextResultSnapshot
        )
      );
    }
    if (snapshot) {
      let count = 0;
      let totalCount = 0;

      for (let i = 0; i < snapshot.docs.length; i++) {
        const postObj = { ...snapshot.docs[i].data(), id: snapshot.docs[i].id };
        const postTextToBeChecked = String(postObj.text);
        //let isFullList = false;
        console.log(keyword, countSearchPost);
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
            console.log(totalCount, snapshot.docs[i - 1]);
          } else {
            totalCount += 1;
          }
        }
      }
      if (count > countSearchPost) {
        count -= 1;
      }
      console.log("TotalCount: ", totalCount);
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

  const onClick = async (e) => {
    e.preventDefault();
    await searchKeyWord(10);
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
      console.log("recover snapshot");
      let count = 0;
      let totalCount = 0;
      console.log(resultList.length);

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
  };

  useEffect(() => {
    if (isUpdatePostList.searchPage) {
      console.log("[SearchPage.js] : refresh Search Result List");
      setNotSearch(false);
      setLoading(true);
      searchKeyWord(10, true, searchInfo.searchKeyword);
      setCurrentSearchCount(0);
      setSearchResults([]);
      setResultList([]);
      setCurrentSearchKeyword(searchInfo.searchKeyword);
      setInputChange((prev) => ({
        ...prev,
        searchInput: searchInfo.searchKeyword,
      }));
      setIsUpdatePostList((prev) => ({ ...prev, searchPage: false }));
    } else if (resultList.length > 0) {
      console.log("[SearchPage.js] : set Search List Data from Global State");
      console.log(searchInfo);
      setNotSearch(false);
      setInputChange((prev) => ({
        ...prev,
        searchInput: searchInfo.searchKeyword,
      }));
      setCurrentSearchCount(searchInfo.currentCountPosts);

      setCurrentSearchKeyword(searchInfo.searchKeyword);
      //const timeDepth = invertNumtoTimeDepth(searchInfo.timeSettingValue);
      setTimeDepthValue(searchInfo.timeSettingValue);
      setTimeDepthSelect(getTimeDepthObj(searchInfo.timeSettingValue));

      setIsResultDesc(searchInfo.descSettingValue);
      setOrderDescOrAsc(searchInfo.descSettingValue ? "desc" : "asc");

      setSearchResults(resultList);
      setCountResult(searchInfo.countResultPosts);
      recoverSnapshot();
    } else {
      console.log("[SearchPage.js ]: else....");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <SearchContainer
      onSearchSubmit={onSearchSubmit}
      onKeyUp={onKeyUp}
      inputValue={inputValue}
      onChange={onChange}
      isInputError={isInputError}
      currentSearchKeyword={currentSearchKeyword}
      countResult={countResult}
      currentSearchCount={currentSearchCount}
      searchResults={searchResults}
      isNextResultExist={isNextResultExist}
      onClick={onClick}
      setTimeDepthValue={setTimeDepthValue}
      timeDepthSelect={timeDepthSelect}
      setTimeDepthSelect={setTimeDepthSelect}
      isResultDesc={isResultDesc}
      setIsResultDesc={setIsResultDesc}
      setOrderDescOrAsc={setOrderDescOrAsc}
      notSearch={notSearch}
      isLoading={isLoading}
    ></SearchContainer>
  );
};

export default SearchPage;

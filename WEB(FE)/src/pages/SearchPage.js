import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import SearchContainer from "../components/search/SearchContainer";
import {
  getSearchQuery,
  getTimeDepthObj,
  invertNumtoTimeDepth,
  invertTimeDepthToNum,
} from "../modules/GetSearchQuery";
import getTimeDepth from "../modules/GetTimeDepth";
import { useAndSetForm, useForm } from "../modules/useForm";
import { ResultList, SearchInfo } from "../store/SearchStore";

const SearchPage = () => {
  const [searchInfo, setSearchInfo] = useRecoilState(SearchInfo);
  const [resultList, setResultList] = useRecoilState(ResultList);

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

  const [sortOption, setSortOption] = useState({
    timeDepthValue: "week",
    order: "desc",
  });
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
    if (inputValue.searchInput.length === 0) {
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
      if (inputValue.searchInput.length === 0) {
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
  const searchKeyWord = async (countSearchPost, firstSearch = false) => {
    /*현재 최신 post 순으로 정렬된 결과를 보여준다. */
    let snapshot;
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

        if (postTextToBeChecked.includes(inputValue.searchInput)) {
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
            console.log("searchFalse");
            totalCount += 1;
          }
        }
      }
      count -= 1;
      if (totalCount <= countSearchPost) {
        setIsNextResultExist(false);
      } else {
        setIsNextResultExist(true);
      }
      if (firstSearch) {
        setCountResult(totalCount);
      }

      setCurrentSearchCount((prev) => prev + count);
      if (firstSearch) {
        setSearchInfo({
          searchKeyword: currentSearchKeyword,
          countResultPosts: totalCount,
          currentCountPosts: currentSearchCount,
          isExistNextSearchResult: isNextResultExist,
          timeSettingValue: invertTimeDepthToNum(timeDepthValue),
          descSettingValue: isResultDesc,
        });
      } else {
        setSearchInfo((prev) => ({
          ...prev,
          currentCountPosts: currentSearchCount,
          isExistNextSearchResult: isNextResultExist,
          timeSettingValue: invertTimeDepthToNum(timeDepthValue),
          descSettingValue: isResultDesc,
        }));
      }
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
      getSearchQuery(false, orderDescOrAsc, getTimeDepth(timeDepthValue))
    );

    if (snapshot) {
      console.log("recover snapshot");
      let count = 0;
      let totalCount = 0;

      for (let i = 0; i < snapshot.docs.length; i++) {
        const postObj = { ...snapshot.docs[i].data(), id: snapshot.docs[i].id };
        const postTextToBeChecked = String(postObj.text);

        if (count < resultList.length) {
          count += 1;
          totalCount += 1;
        } else if (count === resultList.length) {
          count += 1;
          totalCount += 1;
          setNextPostSnapShot((prev) => snapshot.docs[i - 1]);
        } else {
          console.log("searchFalse");
          totalCount += 1;
        }
        /*
        if (postTextToBeChecked.includes(inputValue.searchInput)) {
          
        }*/
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
    if (searchInfo.isUpdateResultList) {
      console.log("[SearchPage.js] : refresh Search Result List");
      setNotSearch(false);
      setLoading(true);
      searchKeyWord(searchInfo.currentCountPosts, true);
      setCurrentSearchKeyword(inputValue.searchInput);
      setSearchInfo((prev) => ({ ...prev, isUpdateResultList: false }));
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
      const timeDepth = invertNumtoTimeDepth(searchInfo.timeSettingValue);
      setTimeDepthValue(timeDepth);
      setTimeDepthSelect(getTimeDepthObj(timeDepthValue));

      setIsResultDesc(searchInfo.descSettingValue);
      setOrderDescOrAsc(isResultDesc ? "desc" : "asc");

      setSearchResults(resultList);
      setCountResult(searchInfo.countResultPosts);
      setNextPostSnapShot(recoverSnapshot());
    } else {
      console.log("[SearchPage.js ]: else....");
    }
  }, []);

  useEffect(() => {
    console.log("[UseEffect : ]", timeDepthValue, orderDescOrAsc, searchInfo);
  }, [timeDepthValue, orderDescOrAsc, searchInfo]);

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

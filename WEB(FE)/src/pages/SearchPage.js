import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import SearchContainer from "../components/search/SearchContainer";
import { getSearchQuery } from "../modules/GetSearchQuery";
import getTimeDepth from "../modules/GetTimeDepth";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isInputError, setIsInputError] = useState(false);
  const [currentSearchKeyword, setCurrentSearchKeyword] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const [currentSearchCount, setCurrentSearchCount] = useState(0);
  const [countResult, setCountResult] = useState(0);
  const [nextResultSnapshot, setNextPostSnapShot] = useState({});
  const [isNextResultExist, setIsNextResultExist] = useState(true);

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

  var visibleResultRange = 10;

  const onSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchInput.length !== 0) {
      setSearchResults([]);
      searchKeyWord(10, true);
      setCurrentSearchKeyword(searchInput);
      setIsSearching(true);
    } else {
      setIsInputError(true);
      setTimeout(() => {
        setIsInputError(false);
      }, 2000);
    }
  };

  const onKeyUp = (e) => {
    if (e.key === "Enter") {
      if (searchInput.length !== 0) {
        setSearchResults([]);
        searchKeyWord(10, true);

        setCurrentSearchKeyword(searchInput);
        setIsSearching(true);
      } else {
        setIsInputError(true);
        setTimeout(() => {
          setIsInputError(false);
        }, 2000);
      }
    }
  };

  const onSearchInputChange = (e) => {
    const {
      target: { value },
    } = e;
    setSearchInput(value);
    setIsSearching(false);
  };

  const searchKeyWord = async (countSearchPost, firstSearch = false) => {
    /*현재 최신 post 순으로 정렬된 결과를 보여준다. */
    let snapshot;
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
    if (snapshot) {
      let count = 0;
      let totalCount = 0;

      for (let i = 0; i < snapshot.docs.length; i++) {
        const postObj = { ...snapshot.docs[i].data(), id: snapshot.docs[i].id };
        const postTextToBeChecked = String(postObj.text);

        if (postTextToBeChecked.includes(searchInput)) {
          if (count < countSearchPost) {
            setSearchResults((prev) => [...prev, postObj]);
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
    }
  };

  const onClick = async (e) => {
    e.preventDefault();
    await searchKeyWord(10);
  };

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);

  return (
    <SearchContainer
      onSearchSubmit={onSearchSubmit}
      onKeyUp={onKeyUp}
      searchInput={searchInput}
      isInputError={isInputError}
      currentSearchKeyword={currentSearchKeyword}
      onSearchInputChange={onSearchInputChange}
      isSearching={isSearching}
      countResult={countResult}
      searchResults={searchResults}
      isNextResultExist={isNextResultExist}
      onClick={onClick}
      setTimeDepthValue={setTimeDepthValue}
      timeDepthSelect={timeDepthSelect}
      setTimeDepthSelect={setTimeDepthSelect}
      isResultDesc={isResultDesc}
      setIsResultDesc={setIsResultDesc}
      setOrderDescOrAsc={setOrderDescOrAsc}
    ></SearchContainer>
  );
};

export default SearchPage;

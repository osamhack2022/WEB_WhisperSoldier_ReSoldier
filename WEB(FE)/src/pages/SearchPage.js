import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
  Timestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbService } from "../lib/FStore";
import SearchContainer from "../components/search/SearchContainer";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentSearchKeyword, setCurrentSearchKeyword] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const [currentSearchCount, setCurrentSearchCount] = useState(0);
  const [countResult, setCountResult] = useState(0);
  const [nextResultSnapshot, setNextPostSnapShot] = useState({});
  const [isNextResultExist, setIsNextResultExist] = useState(true);
  var visibleResultRange = 10;

  const now = new Date();
  const getTimeDepth = (critera) => {
    switch (critera) {
      case "week":
        return Timestamp.fromDate(
          new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)
        );

      case "month":
        return Timestamp.fromDate(
          new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
        );

      case "halfyear":
        return Timestamp.fromDate(
          new Date(now.getFullYear(), now.getMonth() - 6, now.getDate())
        );

      case "fullyear":
        return Timestamp.fromDate(
          new Date(now.getFullYear() - 1, now.getMonth(), now.getDate() - 7)
        );

      default:
        return -8640000000000000;
    }
  };
  console.log("Timestamp : ", getTimeDepth());

  const getSearchResultsQuery = (
    isOrderByLikes = false,
    orderByDesc = false,
    searchTimeDepth
  ) => {
    if (isOrderByLikes) {
      // 추후에 "공감하기" 구현되면 사용될 예정
      if (orderByDesc) {
        return query(
          collection(dbService, "WorryPost"),
          orderBy("like_count", "desc"),
          where("created_timestamp", ">=", searchTimeDepth)
        );
      } else {
        return query(
          collection(dbService, "WorryPost"),
          orderBy("like_count", "asc"),
          where("created_timestamp", ">=", searchTimeDepth)
        );
      }
    } else {
      if (orderByDesc) {
        return query(
          collection(dbService, "WorryPost"),
          orderBy("created_timestamp", "desc"),
          where("created_timestamp", ">=", searchTimeDepth)
        );
      } else {
        return query(
          collection(dbService, "WorryPost"),
          orderBy("created_timestamp", "asc"),
          where("created_timestamp", ">=", searchTimeDepth)
        );
      }
    }
  };

  const onSearchSubmit = async (e) => {
    e.preventDefault();
    setSearchResults([]);
    firstSearchResult(10);

    setIsSearching(true);
  };

  const onKeyUp = (e) => {
    if (e.key === "Enter") {
      setSearchResults([]);
      firstSearchResult(10);

      setIsSearching(true);
    }
  };

  const onSearchInputChange = (e) => {
    const {
      target: { value },
    } = e;
    setSearchInput(value);
    setIsSearching(false);
  };

  const firstSearchResult = async (countSearchPost) => {
    /*현재 최신 post 순으로 정렬된 결과를 보여준다. */
    const snapshot = await getDocs(
      query(
        collection(dbService, "WorryPost"),
        orderBy("created_timestamp", "desc")
      )
    );
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
      setCountResult(totalCount);
      setCurrentSearchCount((prev) => prev + count);
    }
  };

  const searchResult = async (countSearchPost) => {
    /*현재 최신 post 순으로 정렬된 결과를 보여준다. */
    const snapshot = await getDocs(
      query(
        collection(dbService, "WorryPost"),
        orderBy("created_timestamp", "desc"),
        startAfter(nextResultSnapshot)
      )
    );
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
      setCurrentSearchCount((prev) => prev + count);
    }
  };

  const onClick = async (e) => {
    e.preventDefault();
    setCurrentSearchKeyword(searchInput);
    await searchResult(10);
  };

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);

  return (
    <SearchContainer
      onSearchSubmit={onSearchSubmit}
      onKeyUp={onKeyUp}
      searchInput={searchInput}
      currentSearchKeyword={currentSearchKeyword}
      onSearchInputChange={onSearchInputChange}
      isSearching={isSearching}
      countResult={countResult}
      searchResults={searchResults}
      isNextResultExist={isNextResultExist}
      onClick={onClick}
    ></SearchContainer>
  );
};

export default SearchPage;

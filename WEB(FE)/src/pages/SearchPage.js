import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbService } from "../lib/FStore";
import SearchContainer from "../components/search/SearchContainer";

const SearchPage = ({ isDesktop, isTablet }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const [currentSearchCount, setCurrentSearchCount] = useState(0);
  const [countResult, setCountResult] = useState(0);
  const [nextResultSnapshot, setNextPostSnapShot] = useState({});
  const [isNextResultExist, setIsNextResultExist] = useState(true);
  var visibleResultRange = 10;

  const onSearchSubmit = async (e) => {
    e.preventDefault();
    setSearchResults([]);
    firstSearchResult(10);

    setIsSearching(true);
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
      console.log(snapshot.docs);

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
    console.log(snapshot);
    if (snapshot) {
      let count = 0;
      let totalCount = 0;
      console.log(snapshot.docs);

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
    await searchResult(10);
  };

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);

  return (
    <SearchContainer
      onSearchSubmit={onSearchSubmit}
      searchInput={searchInput}
      onSearchInputChange={onSearchInputChange}
      isSearching={isSearching}
      countResult={countResult}
      searchResults={searchResults}
      isNextResultExist={isNextResultExist}
      onClick={onClick}
      isDesktop={isDesktop}
      isTablet={isTablet}
    ></SearchContainer>
  );
};

export default SearchPage;

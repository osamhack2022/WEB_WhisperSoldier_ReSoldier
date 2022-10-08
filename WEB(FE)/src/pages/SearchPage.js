import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where, Timestamp ,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbService } from "../lib/FStore";
import SearchContainer from "../components/search/SearchContainer";

const SearchPage = ({ isDesktop, isTablet }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
	const [isSearching, setIsSearching] = useState(false);
	
	const [timeDepthValue, setTimeDepthValue] = useState("week")
	const [timeDepthSelect, setTimeDepthSelect] = useState({
		week: true,
		month: false,
		halfYear: false,
		fullYear: false,
		allTime: false,
	})

	const [isResultDesc, setIsResultDesc] = useState(true);
  const [orderDescOrAsc, setOrderDescOrAsc] = useState("desc");

  const [currentSearchCount, setCurrentSearchCount] = useState(0);
  const [countResult, setCountResult] = useState(0);
  const [nextResultSnapshot, setNextPostSnapShot] = useState({});
  const [isNextResultExist, setIsNextResultExist] = useState(true);
  var visibleResultRange = 10;

  const now = new Date();
	const getTimeDepth = (critera) => {
		switch(critera) {
			case 'week':
				return(Timestamp.fromDate(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)));
			case 'month':
				return(Timestamp.fromDate(new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())));
			case 'halfYear':
				return(Timestamp.fromDate(new Date(now.getFullYear(), now.getMonth() - 6, now.getDate())));
			case 'fullYear':
				return(Timestamp.fromDate(new Date(now.getFullYear() - 1, now.getMonth(), now.getDate() - 7)));
			case 'allTime':
				return(Timestamp.fromDate(new Date(0)));
			default:
				return(Timestamp.fromDate(new Date(0)));
		}
	}
	console.log("Timestamp : ", getTimeDepth());

  const getSearchResultsQuery = (isOrderByLikes=false, orderDescOrAsc="desc", searchTimeDepth=getTimeDepth(), startAfterPoint) => {
		if (startAfterPoint) {
			if (isOrderByLikes) { // 추후에 "공감하기" 구현되면 사용될 예정
				return (query(collection(dbService, "WorryPost"),
				orderBy("like_count", orderDescOrAsc),
				where("created_timestamp", ">=", searchTimeDepth),
				startAfter(startAfterPoint),
				))
			} else {
				return (query(collection(dbService, "WorryPost"),
				orderBy("created_timestamp", orderDescOrAsc),
				where("created_timestamp", ">=", searchTimeDepth),
				startAfter(startAfterPoint),
				))
			} 
		} else {
			if (isOrderByLikes) { // 추후에 "공감하기" 구현되면 사용될 예정
				return (query(collection(dbService, "WorryPost"),
				orderBy("like_count", orderDescOrAsc),
				where("created_timestamp", ">=", searchTimeDepth),
				))
			} else {
				return (query(collection(dbService, "WorryPost"),
				orderBy("created_timestamp", orderDescOrAsc),
				where("created_timestamp", ">=", searchTimeDepth),
				))
			} 
		}
		
	}


  const onSearchSubmit = async (e) => {
    //e.preventDefault();
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
			getSearchResultsQuery(
				false,
				orderDescOrAsc,
				getTimeDepth(timeDepthValue)
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
			console.log("TotalCount: ", totalCount);
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
			getSearchResultsQuery(
				false,
				orderDescOrAsc,
				getTimeDepth(timeDepthValue),
				nextResultSnapshot
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
	

const onSelectWeek = () => {
	setTimeDepthValue('week');
	setTimeDepthSelect({
		week: true,
		month: false,
		halfYear: false,
		fullYear: false,
		allTime: false,
	});
}
const onSelectMonth = () => {
	setTimeDepthValue('month');
	setTimeDepthSelect({
		week: false,
		month: true,
		halfYear: false,
		fullYear: false,
		allTime: false,
	});
}
const onSelectHalfYear = () => {
	setTimeDepthValue('halfYear');
	setTimeDepthSelect({
		week: false,
		month: false,
		halfYear: true,
		fullYear: false,
		allTime: false,
	});
}
const onSelectFullYear = () => {
	setTimeDepthValue('fullYear');
	setTimeDepthSelect({
		week: false,
		month: false,
		halfYear: false,
		fullYear: true,
		allTime: false,
	});
}
const onSelectAllTime = () => {
	setTimeDepthValue('allTime');
	setTimeDepthSelect({
		week: false,
		month: false,
		halfYear: false,
		fullYear: false,
		allTime: true,
	});
}

	const onSelectDesc = () => {
		setIsResultDesc(true);
		setOrderDescOrAsc("desc")
	}
	const onSelectAsc = () => {
		setIsResultDesc(false);
		setOrderDescOrAsc("asc")
	}

	
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
			onSelectWeek={onSelectWeek}
			onSelectMonth={onSelectMonth}
			onSelectHalfYear={onSelectHalfYear}
			onSelectFullYear={onSelectFullYear}
			onSelectAllTime={onSelectAllTime}
			timeDepthSelect={timeDepthSelect}
			onSelectDesc={onSelectDesc}
			onSelectAsc={onSelectAsc}
			isResultDesc={isResultDesc}
			></SearchContainer>
  );
};

export default SearchPage;

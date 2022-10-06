import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useState } from "react";
import { dbService } from "../lib/FStore";

const SearchPage = () => {
	const [searchResults, setSearchResults] = useState([]);
	const [searchInput, setSearchInput] = useState("");
	const [isSearching, setIsSearching] = useState(false);
	var visibleResultRange = 10;

	const onSearchSubmit = async (e) => {
		e.preventDefault();
		getSearchResults(true);
		setIsSearching(true);
		console.log("SearchResFromSubmit:", searchResults);
	}

	const getSearchResultsQuery = (isOrderByLike=false) => {
		if (isOrderByLike) { // 추후에 "공감하기" 구현되면 사용될 예정
			return (query(collection(dbService, "WorryPost"),
			orderBy("like_count", "desc"),
			))
		} else {
			return (query(collection(dbService, "WorryPost"),
			orderBy("created_timestamp", "desc"),
			))
		} 
	}

	const onSearchInputChange = (e) => {
		const { target: { value } } = e;
		setSearchInput(value);
		setIsSearching(false)
	}
	
	const snapshotToPosts = (snapshot, visibleResultRange=0) => {
		console.log("visRange as Parameter :", visibleResultRange);
		if (snapshot) {
			var count = 0
			console.log("initialCoutn: ", count)
			console.log("visRange", Number(visibleResultRange))
			snapshot.forEach((doc) => {
				const postObj = {
					...doc.data(),
					id: doc.id,
				};
				const postTextToBeChecked = String(postObj.text);
				
				if (postTextToBeChecked.includes(searchInput) && (count < Number(visibleResultRange))){
					setSearchResults((prev) => [...prev, postObj])
					count++;
				} else if (postTextToBeChecked.includes(searchInput)) {
					console.log("searchFalse")
				}
				
			});
			searchResults.map(result => console.log("mapResult:", result))
		}
	}

	const getSearchResults = async (extendingVisibleRange=false, visibleResultRange=10) => {
    const querySnapshot = await getDocs(getSearchResultsQuery());
    if (extendingVisibleRange) {
      setSearchResults([]);
    }
		snapshotToPosts(querySnapshot, visibleResultRange);
  };

	const onClick = async (e) => {
		e.preventDefault();
		visibleResultRange = visibleResultRange + 10;
		await getSearchResults(true, visibleResultRange);
	}
	
	return (
		<>
		<form onSubmit={onSearchSubmit}>
			<input type="text" value={searchInput} onChange={onSearchInputChange} limit={50}></input>
			<button type="submit">검색하기</button>
		</form>
		<div>{(isSearching) && `"${searchInput}"을 키워드로 한 검색 결과`}</div>
		<div>검색 설정</div>
		<div>검색 결과 중 {searchResults.length}개 고민 표시
			<br />
			{(searchResults.length > visibleResultRange) && "전부 검색했습니다!"}
			<br />
			{searchResults.map(result => 
				<div key={result.id}>
					{result.text}
					<hr />
				</div>)}
		</div>
		{(searchResults.length <= visibleResultRange) && <button type="button" onClick={onClick}>10개 더</button>}
		</>
	)
}

export default SearchPage;
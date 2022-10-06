import { collection, getDocs, orderBy, query, where, Timestamp } from "firebase/firestore";
import { SideOptionFormForPostBoard } from "../components/common/SideOptionForm";
import { useState } from "react";
import { dbService } from "../lib/FStore";
import { Link } from "react-router-dom";

const SearchPage = () => {
	const [searchResults, setSearchResults] = useState([]);
	const [searchInput, setSearchInput] = useState("");
	const [isSearching, setIsSearching] = useState(false);
	var visibleResultRange = 10;
	const now = new Date();
	const getTimeDepth = (critera) => {
		switch(critera) {
			case 'week':
				return(Timestamp.fromDate(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)))
			
			case 'month':
				return(Timestamp.fromDate(new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())))

			case 'halfyear':
				return(Timestamp.fromDate(new Date(now.getFullYear(), now.getMonth() - 6, now.getDate())))

			case 'fullyear':
				return(Timestamp.fromDate(new Date(now.getFullYear() - 1, now.getMonth(), now.getDate() - 7)))

			default:
				return(-8640000000000000)
		}
	}
	console.log("Timestamp : ", getTimeDepth())

	const onSearchSubmit = async (e) => {
		e.preventDefault();
		getSearchResults(true);
		setIsSearching(true);
	}

	const getSearchResultsQuery = (isOrderByLikes=false, orderByDesc=false, searchTimeDepth) => {
		if (isOrderByLikes) { // 추후에 "공감하기" 구현되면 사용될 예정
			if (orderByDesc) {
				return (query(collection(dbService, "WorryPost"),
				orderBy("like_count", "desc"),
				where("created_timestamp", ">=", searchTimeDepth),
				))
			} else {
				return (query(collection(dbService, "WorryPost"),
				orderBy("like_count", "asc"),
				where("created_timestamp", ">=", searchTimeDepth),
				))
			}
		} else {
			if (orderByDesc) {
				return (query(collection(dbService, "WorryPost"),
				orderBy("created_timestamp", "desc"),
				where("created_timestamp", ">=", searchTimeDepth),
				))
			} else {
				return (query(collection(dbService, "WorryPost"),
				orderBy("created_timestamp", "asc"),
				where("created_timestamp", ">=", searchTimeDepth),
				))
			}
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
    const querySnapshot = await getDocs(getSearchResultsQuery(false, false));
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
		<SideOptionFormForPostBoard></SideOptionFormForPostBoard>
		<div>{(isSearching) && `"${searchInput}"을 키워드로 한 검색 결과`}</div>
		<div>검색 설정</div>
		<div>검색 결과 중 {searchResults.length}개 고민 표시
			<br />
			{(searchResults.length > visibleResultRange) && "전부 검색했습니다!"}
			<br />
			{searchResults.map(result => 
				<div key={result.id}>
					
					<Link to={`../post/${result.id}`}>{result.text}</Link>
					<hr />
				</div>)
			}
			{(searchResults.length === 0 && isSearching) && "검색결과가 없습니다."}
		</div>
		{(searchResults.length > 9 && (searchResults.length <= visibleResultRange) && searchResults.length !== 0) && <button type="button" onClick={onClick}>10개 더</button>}
		</>
	)
}

export default SearchPage;
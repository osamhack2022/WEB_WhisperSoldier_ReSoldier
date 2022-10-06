import { collection, endAt, getDocs, limit, orderBy, query, startAfter, startAt, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbService } from "../lib/FStore";

const SearchPage = () => {
	const [searchResults, setSearchResults] = useState([]);
	const [visibleRange, setVisibleRange] = useState(10);
	var visibleResultRange = 10;
	const [searchInput, setSearchInput] = useState("");
	const [nextPostSnapShot, setNextPostSnapShot] = useState({});
	const [isNoNext, setIsNoNext] = useState(false);
	const onSearchSubmit = async (e) => {
		e.preventDefault();
		getSearchResults(true);
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
					console.log("searchresults length:", Number(visibleResultRange))
					console.log("true or false:", (count < Number(visibleResultRange)))
					count++;
					console.log("count: ", count)
				} else if (postTextToBeChecked.includes(searchInput)) {
					//console.log("searchFalse")
				}
				
			});
			searchResults.map(result => console.log("mapResult:", result))
		}
	}

	const getSearchResults = async (isDeletingOrEditing=false, visibleResultRange=10) => {
    const querySnapshot = await getDocs(getSearchResultsQuery());
    setNextPostSnapShot(querySnapshot.docs.length === 0 ? null : querySnapshot.docs[0])
    if (isDeletingOrEditing) {
      setSearchResults([]);
    }
		snapshotToPosts(querySnapshot, visibleResultRange);

    //console.log("comments :", querySnapshot.docs);
  };

	const moveNext = async () => {
		const next = getSearchResultsQuery(nextPostSnapShot)
		const querySnapshot = await getDocs(next)
		setNextPostSnapShot(querySnapshot.docs[querySnapshot.docs.length - 1]);
		const afterq = getSearchResultsQuery(querySnapshot.docs[querySnapshot.docs.length - 1])
		const afterSnapshot = await getDocs(afterq);
		(afterSnapshot.docs.length === 0 ? setIsNoNext(true) : setIsNoNext(false))
		snapshotToPosts(querySnapshot);
	}

	const onClick = async (e) => {
		e.preventDefault();
		
		const { name } = e.target
		if (name === "nextTen") {
			console.log("Showing Next Ten");
			moveNext();
		}
		//setSearchResults([]);
		visibleResultRange = visibleResultRange + 10;
		await getSearchResults(true, visibleResultRange);
		setVisibleRange(prev => prev + 10)
	}

	useEffect(() => {
		//getFirstSearch();
	}, []);
	
	return (
		<>
		<form onSubmit={onSearchSubmit}>
			<input type="text" value={searchInput} onChange={onSearchInputChange} limit={50}></input>
			<button type="submit">검색하기</button>
		</form>
		<div>검색 키워드 표시</div>
		<div>검색 설정</div>
		<div>검색 결과 {searchResults.length}개
			<br />
			{searchResults.map(result => 
				<div key={result.id}>
					{result.text}
					<hr />
				</div>)}
		</div>
		<button type="button" onClick={onClick}>10개 더</button>
		</>
	)
}

export default SearchPage;
import { collection, endAt, getDocs, limit, orderBy, query, startAfter, startAt, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbService } from "../lib/FStore";

const SearchPage = () => {
	const [searchResults, setSearchResults] = useState([]);
	const [visibleSearchResults, setVisibleSearchResults] = useState([]);
	const [searchInput, setSearchInput] = useState("");
	const [nextPostSnapShot, setNextPostSnapShot] = useState({});
	const [isNoNext, setIsNoNext] = useState(false);
	
	const onSearchSubmit = async (e) => {
		e.preventDefault();
		getSearchResults(false, true);
		getFirstSearch(10);
		console.log("SearchResFromSubmit:", searchResults);
	}

	const getSearchResultsQuery = (isOrderByLike=false) => {
		if (isOrderByLike) {
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

	const snapshotToPosts = (snapshot) => {
		if (snapshot) {
			snapshot.forEach((doc) => {
				const postObj = {
					...doc.data(),
					id: doc.id,
				};
				const postTextToBeChecked = String(postObj.text);
				//console.log("postTextToBeChecked is: ", postTextToBeChecked);
				//console.log("searchInput is: ", searchInput)
				if (postTextToBeChecked.includes(searchInput)){
					setSearchResults((prev) => [...prev, postObj])
				} else {
					//console.log("searchFalse")
				}
				
			});
			searchResults.map(result => console.log("mapResult:", result))
		}
	}

	const getSearchResults = async (isAddingComments=false, isDeletingOrEditing=false) => {
    const querySnapshot = await getDocs(getSearchResultsQuery());
    setNextPostSnapShot(querySnapshot.docs.length === 0 ? null : querySnapshot.docs[0])
    if (isDeletingOrEditing) {
      setSearchResults([]);
    }
		snapshotToPosts(querySnapshot);

    //console.log("comments :", querySnapshot.docs);
  };

	const getFirstSearch = (postPerPageCount) => {
		console.log("ResultArray: ", searchResults)
		for (let i = 0; i < postPerPageCount; i++) {
			
			console.log("Result: ", searchResults[i])
				
			//console.log("Visible Object", visibleObj)
				//setVisibleSearchResults(prev => [...prev, visibleObj]);
		}
	}

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
		<div>검색 결과
			<br />
			{searchResults.map(result => 
				<div key={result.id}>
					{result.text}
					<hr />
				</div>)}
		</div>
		</>
	)
}

export default SearchPage;
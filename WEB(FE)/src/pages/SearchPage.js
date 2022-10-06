import { collection, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbService } from "../lib/FStore";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ElementLink = styled(Link)`
display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-wrap;`

const SearchPage = () => {
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




		//getSearchResults(true);
		setIsSearching(true);
	}
/*
	const getSearchResultsQuery = (isOrderByLikes=false) => {
		if (isOrderByLikes) { // 추후에 "공감하기" 구현되면 사용될 예정
			return (query(collection(dbService, "WorryPost"),
			orderBy("like_count", "desc"),
			));
		} else {
			return (query(collection(dbService, "WorryPost"),
			orderBy("created_timestamp", "desc"),
			));
		} 
	}
*/
	const onSearchInputChange = (e) => {
		const { target: { value } } = e;
		setSearchInput(value);
		setIsSearching(false);
	}
	
	const firstSearchResult = async(countSearchPost) => {
		/*현재 최신 post 순으로 정렬된 결과를 보여준다. */
		const snapshot = await getDocs(query(collection(dbService, "WorryPost"),
		orderBy("created_timestamp", "desc"),
		));
		if (snapshot) {
			let count = 0;
			let totalCount = 0;
			console.log(snapshot.docs);

			for(let i = 0; i<snapshot.docs.length; i++){
				const postObj = {...snapshot.docs[i].data(), id:snapshot.docs[i].id};
				const postTextToBeChecked = String(postObj.text);
				
				if(postTextToBeChecked.includes(searchInput)){
					if(count<countSearchPost){
						setSearchResults((prev)=>[...prev, postObj])
						count+=1;
						totalCount+=1;
					}
					else if(count === countSearchPost){
						totalCount+=1;
						setNextPostSnapShot(snapshot.docs[i-1]);
					}
					else{
						console.log("searchFalse");
						totalCount+=1;
					}
				}
			}
			if(totalCount<=countSearchPost){
				setIsNextResultExist(false);
			}
			else{
				setIsNextResultExist(true);
			}
			setCountResult(totalCount);
			setCurrentSearchCount(prev => prev+count);
		}
	}

	const searchResult = async(countSearchPost) => {
		/*현재 최신 post 순으로 정렬된 결과를 보여준다. */
		const snapshot = await getDocs(query(
			collection(dbService, "WorryPost"),
			orderBy("created_timestamp", "desc"),
			startAfter(nextResultSnapshot),
			limit(countSearchPost)));
		console.log(snapshot);
		if (snapshot) {
			let count = 0;
			let totalCount = 0;
			console.log(snapshot.docs);

			for(let i = 0; i<snapshot.docs.length; i++){
				const postObj = {...snapshot.docs[i].data(), id:snapshot.docs[i].id};
				const postTextToBeChecked = String(postObj.text);
				
				if(postTextToBeChecked.includes(searchInput)){
					if(count<countSearchPost){
						setSearchResults((prev)=>[...prev, postObj])
						count+=1;
						totalCount+=1;
					}
					else if(count === countSearchPost){
						totalCount+=1;
						setNextPostSnapShot(snapshot.docs[i-1]);
					}
					else{
						console.log("searchFalse");
						totalCount+=1;
					}
				}
			}
			if(totalCount<=countSearchPost){
				setIsNextResultExist(false);
			}
			else{
				setIsNextResultExist(true);
			}
			setCurrentSearchCount(prev => prev+count);
		}
	}

	const onClick = async (e) => {
		e.preventDefault();
		await searchResult(10);
	}

	useEffect(()=>{
		console.log(searchResults);
	},[searchResults]);
	
	return (
		<>
		<form onSubmit={onSearchSubmit}>
			<input type="text" value={searchInput} onChange={onSearchInputChange} limit={50}></input>
			<button type="submit">검색하기</button>
		</form>
		<div>{(isSearching) && `"${searchInput}"을 키워드로 한 검색 결과`}</div>
		<div>검색 설정</div>
		<div>검색 결과 {countResult}개 중 {searchResults.length}개 고민 표시
			<br />
			{(searchResults.length > visibleResultRange) && "전부 검색했습니다!"}
			{!isNextResultExist && "더이상 찾는 결과가 없습니다." }
			<br />
			{searchResults.map(result => 
				<div key={result.id}>
					
					<ElementLink to={`../post/${result.id}`}>{result.text}</ElementLink>
					<hr />
				</div>)
			}
			{(searchResults.length === 0 && isSearching) && "검색결과가 없습니다."}
			{!isNextResultExist && "검색 결과가 없습니다." }
		</div>
		{(searchResults.length > 9 && (searchResults.length <= visibleResultRange) && searchResults.length !== 0) && <button type="button" onClick={onClick}>10개 더</button>}
		</>
	)
}

export default SearchPage;
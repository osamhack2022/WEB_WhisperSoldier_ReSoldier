import { collection, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbService } from "../lib/FStore";

const SearchPage = () => {
	const [searchResults, setSearchResults] = useState([]);
	const [earliestVisible, setEarliestVisible] = useState({});
	const [isNoNext, setIsNoNext] = useState(false);
	
	const onSearchSubmit = async (e) => {
	
	}

	const snapshotToPosts = (snapshot) => {
		if (snapshot) {
			snapshot.forEach((doc) => {
				const postObj = {
					...doc.data(),
					id: doc.id,
				};
				setSearchResults((prev) => [...prev, postObj])
			});
		}
	}

	
	const getQueryWithDescendingTime = (limitDocs, startAfterPoint) => {
		if (startAfterPoint) {
			return (query(collection(dbService, "WorryPost"),
			orderBy("created_timestamp", "desc"),
			startAfter(startAfterPoint),
			limit(limitDocs)
			))
		} else {
			return (query(collection(dbService, "WorryPost"),
			orderBy("created_timestamp", "desc"),
			limit(limitDocs)
			))
		}  
	}
	
	
	const getFirst = async () => {
		const first = getQueryWithDescendingTime(10);
		const firstSnapshot = await getDocs(first);
		setEarliestVisible(firstSnapshot.docs[firstSnapshot.docs.length - 1]);
		snapshotToPosts(firstSnapshot);
	}


	const moveNext = async () => {
		const next = getQueryWithDescendingTime(10, earliestVisible)
		const querySnapshot = await getDocs(next)
		setEarliestVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
		const afterq = getQueryWithDescendingTime(1, querySnapshot.docs[querySnapshot.docs.length - 1])
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
		// getFirst();
	}, []);
	
	return (
		<>
		<form onSubmit={onSearchSubmit}>
			<input>검색창</input>
			<button type="submit">검색하기</button>
		</form>
		<div>검색 키워드 표시</div>
		<div>검색 설정</div>
		<div>검색 결과</div>
		</>
	)
}

export default SearchPage;
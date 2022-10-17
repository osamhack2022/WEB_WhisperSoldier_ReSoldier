import { collection, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbService } from "../lib/FStore";


const TagPage = () => {

	const [tags, setTags] = useState([]);
  const [nextTagSnapshot, setNextTagSnapshot] = useState({});
  const [isNextTagExist, setIsNextTagExist] = useState(false);
  const [isShowContainer, setIsShowContainer] = useState(false);

	const snapshotToPosts = (snapshot) => {
    if (snapshot) {
      snapshot.forEach((doc) => {
        const tagObj = {
          ...doc.data(),
          id: doc.id,
        };
        console.log(tagObj);
        setTags((prev) => [...prev, tagObj]);
      });
    }
	};
	
	const getFirst = async () => {
		const firstSnapshot = await getDocs(
			query(collection(dbService, "Tag"),
				orderBy("tag_count", "desc"),
				//startAfter(),
				limit(20),
			)
		);
		setNextTagSnapshot(firstSnapshot.docs[firstSnapshot.docs.length - 1]);
		snapshotToPosts(firstSnapshot);
		if (firstSnapshot.docs.length < 20) {
		  setIsNextTagExist(false);
		} else {
		  try {
			const nextPostsSnapshot = await getDocs(
				query(collection(dbService, "Tag"),
					orderBy("tag_count", "desc"),
					startAfter(firstSnapshot.docs[firstSnapshot.docs.length - 1]),
					limit(1),
				)
			);
			if (nextPostsSnapshot.docs.length === 0) {
			  console.log("no more post data!");
			  setIsNextTagExist(false);
			} else {
			  setIsNextTagExist(true);
			  console.log("more post data exist!");
			}
		  } catch (e) {
			console.log("error with get Post!");
		  }
		}
	};
	
		const moveNext = async () => {
			const querySnapshot = await getDocs(
				query(collection(dbService, "Tag"),
					orderBy("tag_count", "desc"),
					startAfter(nextTagSnapshot),
					limit(20),
				)
			);
			setNextTagSnapshot(querySnapshot.docs[querySnapshot.docs.length - 1]);
	
			const afterSnapshot = await getDocs(
				query(collection(dbService, "Tag"),
					orderBy("tag_count", "desc"),
					startAfter(querySnapshot.docs[querySnapshot.docs.length - 1]),
					limit(1),
				)
			);
	
			//setCountCurrentPost((prev) => prev + 10);
			if (afterSnapshot.docs.length === 0) {
				setIsNextTagExist(false);
			} else {
				setIsNextTagExist(true);
			}
			snapshotToPosts(querySnapshot);
		};
		const onClick = async (e) => {
			e.preventDefault();
			moveNext();
		};
	useEffect(() => {
		getFirst();
	}, [])
	return (
		<>
			<div>태그 페이지</div>
			{tags.length !== 0 ? (
              tags.map((tagDoc) => (
								<div key={tagDoc.id} tagDoc={tagDoc}>#{tagDoc.tag_name}, {tagDoc.tag_count}개 Post</div>
              ))
            ) : (
              <div>잠시만 기다려 주세요</div>
			)}
			{isNextTagExist && (
        <button onClick={onClick}>20개 더 보기</button>
			)}
			
		</>

	)
}

export default TagPage;

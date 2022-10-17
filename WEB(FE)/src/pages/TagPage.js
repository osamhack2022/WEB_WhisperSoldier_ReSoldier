import { collection, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbService } from "../lib/FStore";


const TagPage = () => {

	const [tags, setTags] = useState([]);
  const [nextTagSnapshot, setNextTagSnapshot] = useState({});
  const [isNextTagExist, setIsNextTagExist] = useState(false);
  const [isShowContainer, setIsShowContainer] = useState(false);

	const snapshotToTags = (snapshot) => {
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
				where("tag_count", ">", 0),
				limit(20),
			)
		);
		setNextTagSnapshot(firstSnapshot.docs[firstSnapshot.docs.length - 1]);
		snapshotToTags(firstSnapshot);
		if (firstSnapshot.docs.length < 20) {
		  setIsNextTagExist(false);
		} else {
		  try {
			const nextTagsSnapshot = await getDocs(
				query(collection(dbService, "Tag"),
					orderBy("tag_count", "desc"),
					where("tag_count", ">", 0),
					startAfter(firstSnapshot.docs[firstSnapshot.docs.length - 1]),
					limit(1),
				)
			);
			if (nextTagsSnapshot.docs.length === 0) {
			  setIsNextTagExist(false);
			} else {
			  setIsNextTagExist(true);
			}
		  } catch (e) {
			console.log("Error with getting tags!");
		  }
		}
	};

		const moveNext = async () => {
			const querySnapshot = await getDocs(
				query(collection(dbService, "Tag"),
					orderBy("tag_count", "desc"),
					where("tag_count", ">", 0),
					startAfter(nextTagSnapshot),
					limit(20),
				)
			);
			setNextTagSnapshot(querySnapshot.docs[querySnapshot.docs.length - 1]);
			const afterSnapshot = await getDocs(
				query(collection(dbService, "Tag"),
					orderBy("tag_count", "desc"),
					where("tag_count", ">", 0),
					startAfter(querySnapshot.docs[querySnapshot.docs.length - 1]),
					limit(1),
				)
			);
			if (afterSnapshot.docs.length === 0) {
				setIsNextTagExist(false);
			} else {
				setIsNextTagExist(true);
			}
			snapshotToTags(querySnapshot);
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
              tags.map((tagdoc) => (
								<div key={tagdoc.id} tagdoc={tagdoc}>#{tagdoc.tag_name}, {tagdoc.tag_count} More</div>
              ))
            ) : (
              <div>잠시만 기다려 주세요</div>
			)}
			{isNextTagExist && (
        <button onClick={onClick}>20개 더 보기</button>
			)}
			<div>해당 태그를 가진 Tag들</div>
			<div>

			</div>
		</>

	)
}

export default TagPage;

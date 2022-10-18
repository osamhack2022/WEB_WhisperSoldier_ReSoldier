import { collection, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { dbService } from "../lib/FStore";
import SelectTagPostBoard from "../components/tag/SelectTagPostBoard";

const TagPage = () => {

	const [tags, setTags] = useState([]);
	const [selectedTag, setSelectedTag] = useState("");
	const [tagPosts, setTagPosts] = useState([]);
  const [nextTagSnapshot, setNextTagSnapshot] = useState({});
  const [nextPostSnapshot, setNextPostSnapshot] = useState({});
  const [isNextTagExist, setIsNextTagExist] = useState(false);

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

	const snapshotToPosts = (snapshot) => {
    if (snapshot) {
      snapshot.forEach((doc) => {
        const postObj = {
          ...doc.data(),
          id: doc.id,
        };
        console.log(postObj);
        setTagPosts((prev) => [...prev, postObj]);
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
		const onClickForMore = async (e) => {
			e.preventDefault();
			moveNext();
		};
	
	const getTagPosts = async (tagName) => {
		const firstSnapshot = await getDocs(
			query(collection(dbService, "WorryPost"),
				orderBy("created_timestamp", "desc"),
				where("tag_name", "==", tagName),
				limit(10),
			)
		);
		setNextPostSnapshot(firstSnapshot.docs[firstSnapshot.docs.length - 1]);
		snapshotToPosts(firstSnapshot);
		if (firstSnapshot.docs.length < 10) {
		  setIsNextTagExist(false);
		} else {
		  try {
			const nextTagsSnapshot = await getDocs(
				query(collection(dbService, "WorryPost"),
				orderBy("created_timestamp", "desc"),
				where("tag_name", "==", tagName),
				limit(10),
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
	}
	
	const selectTag = async (tagName) => {
		setSelectedTag(tagName);
		setTagPosts([]);
		console.log("tagName: ", tagName);
		getTagPosts(tagName);
	}
	useEffect(() => {
		getFirst();
	}, [])
	return (
		<>
			<div>태그 페이지</div>
			{tags.length !== 0 ? (
              tags.map((tagdoc) => (
								<div key={tagdoc.id} tagdoc={tagdoc} onClick={() => selectTag(tagdoc.tag_name)}>#{tagdoc.tag_name}, {tagdoc.tag_count} More</div>
              ))
            ) : (
              <div>잠시만 기다려 주세요</div>
			)}
			{isNextTagExist && (
        <button onClick={onClickForMore}>20개 더 보기</button>
			)}


			<SelectTagPostBoard></SelectTagPostBoard>
			<div>
				{selectedTag === "" ? <>태그를 선택해 주세요</> :
					<>해당 태그를 가진 Post들</>
				}
				{(selectedTag !== "") && (tagPosts.length === 0) ? (
							<div>포스트를 불러오는 중이거나 해당 태그의 포스트가 존재하지 않습니다.</div>
            ) : (
							tagPosts.map((tagpost) => (
								<div key={tagpost.id}>
									<br />
									<Link  to={`/post/${tagpost.id}`}>{tagpost.text}</Link>
								</div>
							))
			)}
			</div>
		</>

	)
}

export default TagPage;

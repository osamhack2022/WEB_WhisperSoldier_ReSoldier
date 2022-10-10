import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { whisperSodlierSessionKey } from "../../lib/Const";
import { dbFunction, dbService } from "../../lib/FStore";

const MyPostBoard = () => {
	const { uid: currentUserUid } = JSON.parse(
		sessionStorage.getItem(whisperSodlierSessionKey)
	);
	const { query, collection, getDocs, limit, orderBy, startAfter, where, doc } = dbFunction;
	const [postsCreated, setPostsCreated] = useState([]);
	const [nextItemSnapShot, setNextItemSnapShot] = useState({});
  const [isNextItemExist, setIsNextItemExist] = useState(false);

	const snapShotToCreatedPosts = (snapshot) => {
		if (snapshot) {
			snapshot.forEach((doc) => {
				const postObj = {
					...doc.data(),
					id: doc.id,
				};
				setPostsCreated((prev) => [...prev, postObj]);
			});
		}
	};

	const myPostBoard = async (next) => {
		if (next) {
			console.log("showing next");
			const querySnapshot = await getDocs(
				query(collection(dbService, "WorryPost"),
					orderBy("created_timestamp", "desc"),
					where("creator_id", "==", currentUserUid),
					startAfter(nextItemSnapShot),
					limit(10)
				)
			);
			setNextItemSnapShot(querySnapshot.docs[querySnapshot.docs.length - 1]);

			const afterSnapshot = await getDocs(
				query(collection(dbService, "WorryPost"),
					orderBy("created_timestamp", "desc"),
					where("creator_id", "==", currentUserUid),
					startAfter(querySnapshot.docs[querySnapshot.docs.length - 1]),
					limit(1)
				)
			);
			if (afterSnapshot.docs.length === 0) {
				setIsNextItemExist(false);
			} else {
				setIsNextItemExist(true);
			}
			snapShotToCreatedPosts(querySnapshot);
		} else {
			const firstSnapshot = await getDocs(
				query(collection(dbService, "WorryPost"),
					orderBy("created_timestamp", "desc"),
					where("creator_id", "==", currentUserUid),
					limit(10)
				)
			);
			setNextItemSnapShot(firstSnapshot.docs[firstSnapshot.docs.length - 1]);
			snapShotToCreatedPosts(firstSnapshot);
			if(firstSnapshot.docs.length < 10) {
				setIsNextItemExist(false);
			} else {
				setIsNextItemExist(true);
			}
		};
	}

	const onClick = async (e) => {
		e.preventDefault();
		myPostBoard(true);
	}
	useEffect(() => {
		myPostBoard(false);
	}, [])

	return (
		<div>
			<h4>작성한 고민 글</h4> <hr />
			{postsCreated.length !== 0 ? (
				postsCreated.map((post) => (
					<div key={post.id}>
						<Link to={`/post/${post.id}`}>{post.text}</Link>
						<hr />
					</div>
				))
			) : (
				<div>잠시만 기다려 주세요</div>
			)}
			{isNextItemExist && (
				<button onClick={onClick}>내 포스트 10개 더 보기</button>
			)}
			<br />
		</div>
	)
}

export default MyPostBoard;
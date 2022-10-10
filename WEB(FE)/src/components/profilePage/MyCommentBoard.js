import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { whisperSodlierSessionKey } from "../../lib/Const";
import { dbFunction, dbService } from "../../lib/FStore";

const MyCommentBoard = () => {
	const { uid: currentUserUid } = JSON.parse(
		sessionStorage.getItem(whisperSodlierSessionKey)
	);
	const { query, collection, getDocs, limit, orderBy, startAfter, where, doc } = dbFunction;
	const [commentsCreated, setCommentsCreated] = useState([]);
	const [nextItemSnapShot, setNextItemSnapShot] = useState({});
	const [isNextItemExist, setIsNextItemExist] = useState(false);
	
	const snapShotToCreatedComments = (snapshot) => {
		if (snapshot) {
			snapshot.forEach((doc) => {
				const postObj = {
					...doc.data(),
					id: doc.id,
				};
				setCommentsCreated((prev) => [...prev, postObj]);
			});
		}
	};

	const myCommentBoard = async (next) => {
		if (next) {
			console.log("showing next comments created");
			const querySnapshot = await getDocs(
				query(collection(dbService, "Comment"),
					orderBy("created_timestamp", "desc"),
					where("commentor_id", "==", currentUserUid),
					startAfter(nextItemSnapShot),
					limit(10)
				)
			);
			setNextItemSnapShot(querySnapshot.docs[querySnapshot.docs.length - 1]);

			const afterSnapshot = await getDocs(
				query(collection(dbService, "Comment"),
					orderBy("created_timestamp", "desc"),
					where("commentor_id", "==", currentUserUid),
					startAfter(querySnapshot.docs[querySnapshot.docs.length - 1]),
					limit(1)
				)
			);
			if (afterSnapshot.docs.length === 0) {
				setIsNextItemExist(false);
			} else {
				setIsNextItemExist(true);
			}
			snapShotToCreatedComments(querySnapshot);
		} else {
			const firstSnapshot = await getDocs(
				query(collection(dbService, "Comment"),
					orderBy("created_timestamp", "desc"),
					where("commentor_id", "==", currentUserUid),
					limit(10)
				)
			);
			setNextItemSnapShot(firstSnapshot.docs[firstSnapshot.docs.length - 1])
			snapShotToCreatedComments(firstSnapshot);
			if(firstSnapshot.docs.length < 10) {
				setIsNextItemExist(false);
			} else {
				setIsNextItemExist(true);
			}
		};
	}

	const onClick = async (e) => {
		e.preventDefault();
		myCommentBoard(true);
	}

	useEffect(() => {
		myCommentBoard(false);
	}, [])
	return (
		<div>
			<h4>작성한 댓글</h4> <hr />
			{commentsCreated.length !== 0 ? (
				commentsCreated.map((comment) => (
					<div key={comment.id}>
						<Link to={`/post/${comment.associated_post_id}`}>{comment.comment_text}</Link>
						<hr />
					</div>
				))
			) : (
				<div>잠시만 기다려 주세요</div>
			)}
			{isNextItemExist && (
				<button onClick={onClick}>내 댓글 10개 더 보기</button>
			)}
			<br />
		</div>
	)
}

export default MyCommentBoard;
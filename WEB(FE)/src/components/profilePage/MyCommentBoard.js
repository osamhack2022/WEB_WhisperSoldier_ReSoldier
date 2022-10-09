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
	const myCommentBoard = async (nowUserId) => {
    console.log("생성한댓글직전아이디", nowUserId);
    const q = query(collection(dbService, "Comment"),
      orderBy("created_timestamp", "desc"),
      where("commentor_id", "==", nowUserId)
    )
    const snapshot = await getDocs(q);
    if (snapshot) {
      snapshot.forEach((doc) => {
        const postObj = {
          ...doc.data(),
          id: doc.id,
        };
        setCommentsCreated((prev) => [...prev, postObj]);
      })
    }
	}
	useEffect(() => {
		myCommentBoard(currentUserUid);
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
			<br />
		</div>
	)
}

export default MyCommentBoard;
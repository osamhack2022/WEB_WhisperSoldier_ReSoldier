import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { whisperSodlierSessionKey } from "../../lib/Const";
import { dbFunction, dbService } from "../../lib/FStore";

const MyCommentLikeBoard = () => {
	const { uid: currentUserUid } = JSON.parse(
		sessionStorage.getItem(whisperSodlierSessionKey)
	);
	const { query, collection, getDocs, limit, orderBy, startAfter, where, doc, getDoc } = dbFunction;
  const [commentsLiked, setCommentsLiked] = useState([]);
	const myCommentLikeBoard = async (nowUserId) => {
    console.log("직전 아이디: ", nowUserId);
    const q = query(collection(dbService, "CommentLike"),
      where("user_id", "==", nowUserId),
      orderBy("created_timestamp", "desc")
    )
    const snapshot = await getDocs(q);
    console.log("SNAPSHOT:", snapshot.docs);
    
    if (snapshot) {
      snapshot.forEach(async (document) => {
        const commentLikeObj = {
          ...document.data(),
          id: document.id,
        };
        console.log("commentLikeObj: ", commentLikeObj.associated_comment_id);
        const commentRef = doc(dbService, "Comment", commentLikeObj.associated_comment_id)
        const commentSnap = await getDoc(commentRef)
        const commentLikedObj = {
          ...commentSnap.data(),
          id:commentSnap.id,
        }
        setCommentsLiked((prev) => [...prev, commentLikedObj])
      })
    }
  }
	useEffect(() => {
		myCommentLikeBoard(currentUserUid);
	}, [])
	return (
		<div><h4>공감한 댓글</h4> <hr />
			{commentsLiked.length !== 0 ? (
					commentsLiked.map((comment) => (
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

export default MyCommentLikeBoard;
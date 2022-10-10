import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { whisperSodlierSessionKey } from "../../lib/Const";
import { dbFunction, dbService } from "../../lib/FStore";
import { getProfilePageQuery } from "../../modules/GetProfilePageQuery";

const MyCommentLikeBoard = () => {
	const { uid: currentUserUid } = JSON.parse(
		sessionStorage.getItem(whisperSodlierSessionKey)
	);
	const { query, collection, getDocs, limit, orderBy, startAfter, where, doc, getDoc } = dbFunction;
  const [commentsLiked, setCommentsLiked] = useState([]);
  const [nextItemSnapShot, setNextItemSnapShot] = useState({});
  const [isNextItemExist, setIsNextItemExist] = useState(false);
  
  const snapshotToLikedComments = (snapshot) => {
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

  const myCommentLikeBoard = async (next) => {
    if (next) {
      try {
        console.log("showing next liked comments");
        const querySnapshot = await getDocs(
          getProfilePageQuery("CommentLike", "user_id", 10, nextItemSnapShot)
        );
        setNextItemSnapShot(querySnapshot.docs[querySnapshot.docs.length - 1]);
        
        const afterSnapshot = await getDocs(
					// 이 부분을 getProfilePageQuery로 처리할 시 try-catch에서 에러를 잡아내지 못했기에 그대로 쿼리로 보존했다.
          query(collection(dbService, "CommentLike"),
            orderBy("created_timestamp", "desc"),
            where("user_id", "==", currentUserUid),
            startAfter(querySnapshot.docs[querySnapshot.docs.length - 1]),
            limit(1)
          )
        );
        if (afterSnapshot.docs.length === 0) {
          setIsNextItemExist(false);
        } else {
          setIsNextItemExist(true);
        };
        snapshotToLikedComments(querySnapshot);
      } catch (e) {
        if( e.message === "Function startAfter() called with invalid data. Unsupported field value: undefined" ) {
          setIsNextItemExist(false);
        } else {
          console.log("Other Error")
      }
    }
    } else {
      const firstSnapshot = await getDocs(
        getProfilePageQuery("CommentLike", "user_id", 10)
      );
			setNextItemSnapShot(firstSnapshot.docs[firstSnapshot.docs.length - 1]);
      snapshotToLikedComments(firstSnapshot);
      if(firstSnapshot.docs.length < 10) {
				setIsNextItemExist(false);
			} else {
				setIsNextItemExist(true);
			}
    }
  }

  const onClick = async (e) => {
    e.preventDefault();
    myCommentLikeBoard(true);
  }

	useEffect(() => {
		myCommentLikeBoard(false);
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
      {isNextItemExist && (
				<button onClick={onClick}>내가 공감한 댓글 10개 더 보기</button>
			)}
			<br />
		</div>
	)
}

export default MyCommentLikeBoard;
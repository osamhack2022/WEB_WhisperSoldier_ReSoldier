import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { whisperSodlierSessionKey } from "../../lib/Const";
import { dbFunction, dbService } from "../../lib/FStore";

const MyPostLikeBoard = () => {
	const { uid: currentUserUid } = JSON.parse(
		sessionStorage.getItem(whisperSodlierSessionKey)
	);
	const { query, collection, getDocs, limit, orderBy, startAfter, where, doc, getDoc } = dbFunction;
  const [postsLiked, setPostsLiked] = useState([]);
	const [nextItemSnapShot, setNextItemSnapShot] = useState({});
  const [isNextItemExist, setIsNextItemExist] = useState(false);

	const snapShotToLikedPosts = useCallback((snapshot) => {

	})
	const myPostLikeBoard = async (nowUserId) => {
    console.log("직전 아이디: ", nowUserId);
    const q = query(collection(dbService, "PostLike"),
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
        console.log("commentLikeObj: ", commentLikeObj.associated_post_id);
        const postRef = doc(dbService, "WorryPost", commentLikeObj.associated_post_id)
        const postSnap = await getDoc(postRef)
        const postLikedObj = {
          ...postSnap.data(),
          id:postSnap.id,
        }
        setPostsLiked((prev) => [...prev, postLikedObj])
      })
    }
  }

	useEffect(() => {
		myPostLikeBoard(currentUserUid);
	}, [])
	return (
		<div><h4>공감한 고민 글</h4> <hr />
			{postsLiked.length !== 0 ? (
					postsLiked.map((post) => (
						<div key={post.id}>
							<Link to={`/post/${post.id}`}>{post.text}</Link>
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

export default MyPostLikeBoard;
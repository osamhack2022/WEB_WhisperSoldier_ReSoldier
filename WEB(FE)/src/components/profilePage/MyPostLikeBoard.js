import { useEffect, useState } from "react";
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

  const snapShotToLikedPosts = (snapshot) => {
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
          id: postSnap.id,
        }
        setPostsLiked((prev) => [...prev, postLikedObj])
      })
    }
  };

	const myPostLikeBoard = async (next) => {
		if (next) {
      console.log("showing next liked posts");
      const querySnapshot = await getDocs(
				query(collection(dbService, "PostLike"),
					orderBy("created_timestamp", "desc"),
					where("user_id", "==", currentUserUid),
					startAfter(nextItemSnapShot),
					limit(10)
				)
      );
      setNextItemSnapShot(querySnapshot.docs[querySnapshot.docs.length - 1]);
      
      const afterSnapshot = await getDocs(
				query(collection(dbService, "PostLike"),
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
			snapShotToLikedPosts(querySnapshot);
		} else {
			const firstSnapshot = await getDocs(
				query(collection(dbService, "PostLike"),
					where("user_id", "==", currentUserUid),
					orderBy("created_timestamp", "desc"),
					limit(10)
				)
			);
			setNextItemSnapShot(firstSnapshot.docs[firstSnapshot.docs.length - 1]);
			snapShotToLikedPosts(firstSnapshot);
			if(firstSnapshot.docs.length < 10) {
				setIsNextItemExist(false);
			} else {
				setIsNextItemExist(true);
			}
		}
  }

	const onClick = async (e) => {
		e.preventDefault();
		myPostLikeBoard(true);
	}
	useEffect(() => {
		myPostLikeBoard(false);
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
      {isNextItemExist && (
				<button onClick={onClick}>내가 공감한 포스트 10개 더 보기</button>
			)}
			<br />
		</div>
	)
}

export default MyPostLikeBoard;
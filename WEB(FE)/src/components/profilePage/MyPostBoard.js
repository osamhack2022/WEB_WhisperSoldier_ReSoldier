import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authService } from "../../lib/FAuth";
import { dbService } from "../../lib/FStore";

const MyPostBoard = () => {
	const [postsCreated, setPostsCreated] = useState([]);
	const myPostBoard = async (nowUserId, next) => {
		if (next) {
			console.log("showing next");
	
		} else {
		  console.log("생성한포스트직전아이디", nowUserId);
		  const q = query(collection(dbService, "WorryPost"),
			orderBy("created_timestamp", "desc"),
			where("creator_id", "==", nowUserId)
		  )
		  const snapshot = await getDocs(q);
		  if (snapshot) {
			snapshot.forEach((doc) => {
			  const postObj = {
				...doc.data(),
				id: doc.id,
			  };
			  setPostsCreated((prev) => [...prev, postObj]);
			})
		}
		}
	}
	useEffect(() => {
		const unsub = onAuthStateChanged(authService, (user) => {
      unsub();
      if (user) {
        const nowUserId = user.uid
        console.log("NOWUSERID: ", nowUserId);
        myPostBoard(nowUserId, false);
      } else {
        // not logged in
      }
    });
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
			<br />
		</div>
	)
}

export default MyPostBoard;
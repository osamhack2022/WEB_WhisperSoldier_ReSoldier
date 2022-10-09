import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../lib/FAuth";
import { useState, useEffect } from "react";
import { dbService, dbFunction } from "../lib/FStore";
import { getDoc } from "firebase/firestore";

const ProfilePage = () => {
  const { query, collection, getDocs, limit, orderBy, startAfter, where, doc } = dbFunction;

  const navigate = useNavigate();
  const [postsCreated, setPostsCreated] = useState([]);
  const [commentsCreated, setCommentsCreated] = useState([]);
  const [postsLiked, setPostsLiked] = useState([]);
  const [commentsLiked, setCommentsLiked] = useState([]);
  const [currentUserId, setCurerntUserId] = useState("");
  
  console.log();
  console.log(currentUserId);
  //const nowUserId = authService.currentUser.uid;
  const onClick = async () => {
    await signOut(authService).then(() => {
      console.log("[Profile.js]로그아웃 성공");
    });
    navigate("/");
  };

  const getPostsCreated = async (nowUserId) => {
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
  const getCommentsCreated = async (nowUserId) => {
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
  const getPostsLiked = async (nowUserId) => {
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
  
  const getCommentsLiked = async (nowUserId) => {
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
    const unsub = onAuthStateChanged(authService, (user) => {
      unsub();
      if (user) {
        const nowUserId = user.uid
        console.log("NOWUSERID: ", nowUserId);
        setCurerntUserId(nowUserId);
        console.log("이펙트에서:", currentUserId);
        getPostsCreated(nowUserId);
        getCommentsCreated(nowUserId);
        getPostsLiked(nowUserId);
        getCommentsLiked(nowUserId);
      } else {
        // not logged in
      }
    });
    
  }, [])

  return (
    <div>
      <div>프로필 페이지 페이지</div>
      <div>가입한지 몇일째</div>
      <div>
        <h4>작성한 고민 글</h4> <hr />
        {postsCreated.length !== 0 ? (
          postsCreated.map((post) => (
            <>
              <Link to={`/post/${post.id}`} key={post.id}>{post.text}</Link>
              <hr />
            </>
          ))
        ) : (
          <div>잠시만 기다려 주세요</div>
        )}
        <br />
      </div>
      <div>
        <h4>작성한 댓글</h4> <hr />
        {commentsCreated.length !== 0 ? (
          commentsCreated.map((comment) => (
            <>
              <Link to={`/post/${comment.associated_post_id}`} key={comment.id}>{comment.comment_text}</Link>
              <hr />
            </>
          ))
        ) : (
          <div>잠시만 기다려 주세요</div>
        )}
        <br />
      </div>
      <div><h4>공감한 고민 글</h4> <hr />
        {postsLiked.length !== 0 ? (
            postsLiked.map((post) => (
              <>
                <Link to={`/post/${post.id}`} key={post.id}>{post.text}</Link>
                <hr />
              </>
            ))
          ) : (
            <div>잠시만 기다려 주세요</div>
        )}
        <br />
      </div>
      <div><h4>공감한 댓글</h4> <hr />
        {commentsLiked.length !== 0 ? (
            commentsLiked.map((comment) => (
              <>
                <Link to={`/post/${comment.associated_post_id}`} key={comment.id}>{comment.comment_text}</Link>
                <hr />
              </>
            ))
          ) : (
            <div>잠시만 기다려 주세요</div>
        )}
        <br />
      </div>
      <br />
      <Link to="/">홈페이지</Link>
      <br />
      <button onClick={onClick}>로그아웃</button>
    </div>
  );
};

export default ProfilePage;

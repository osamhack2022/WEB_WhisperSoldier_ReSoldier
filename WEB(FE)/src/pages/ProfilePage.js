import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../lib/FAuth";
import React, { useState, useEffect } from "react";
import { dbService, dbFunction } from "../lib/FStore";
import { getDoc } from "firebase/firestore";
import MyCommentBoard from "../components/profilePage/MyCommentBoard";
import MyPostLikeBoard from "../components/profilePage/MyPostLikeBoard";
import MyCommentLikeBoard from "../components/profilePage/MyCommentLikeBoard";
import MyPostBoard from "../components/profilePage/MyPostBoard";

const ProfilePage = () => {
  const { query, collection, getDocs, limit, orderBy, startAfter, where, doc } = dbFunction;

  const navigate = useNavigate();
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
    const unsub = onAuthStateChanged(authService, (user) => {
      unsub();
      if (user) {
        const nowUserId = user.uid
        console.log("NOWUSERID: ", nowUserId);
        setCurerntUserId(nowUserId);
        console.log("이펙트에서:", currentUserId);
        myCommentBoard(nowUserId);
        myPostLikeBoard(nowUserId);
        myCommentLikeBoard(nowUserId);
      } else {
        // not logged in
      }
    });
    
  }, [])

  return (
    <div>
      <div>프로필 페이지 페이지</div>
      <div>가입한지 몇일째</div>
      <MyPostBoard></MyPostBoard>
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
      <br />
      <Link to="/">홈페이지</Link>
      <br />
      <button onClick={onClick}>로그아웃</button>
    </div>
  );
};

export default ProfilePage;

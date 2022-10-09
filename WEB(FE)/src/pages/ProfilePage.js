import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../lib/FAuth";
import { dbFunction, dbService } from "../lib/FStore";

const ProfilePage = () => {
  const { query, collection, getDocs, limit, orderBy, startAfter, where } =
    dbFunction;

  const navigate = useNavigate();
  const [PostsCreated, setPostsCreated] = useState([]);
  const [commentsCreated, setCommentsCreated] = useState([]);
  const [postsLiked, setPostsLiked] = useState([]);
  const [commentsLiked, setCommentsLiked] = useState([]);
  const [currentUserId, setCurerntUserId] = useState("");

  const nowUserId = getAuth().currentUser.uid;

  const onClick = async () => {
    await signOut(authService).then(() => {
      console.log("[Profile.js]로그아웃 성공");
    });
    navigate("/");
  };

  const getPostsCreated = () => {
    const q = query(
      collection(dbService, "WorryPost"),
      orderBy("created_timestamp", "desc")
    );
  };
  const getCommentsCreated = () => {};
  const getPostsLiked = () => {};
  const getCommentsLiked = () => {};
  useEffect(() => {}, []);

  return (
    <div>
      <div>프로필 페이지 페이지</div>
      <div>작성한 고민 글</div>
      <div>작성한 댓글</div>
      <div>공감한 고민 글</div>
      <div>공감한 댓글</div>
      <br />
      <Link to="/">홈페이지</Link>
      <br />
      <button onClick={onClick}>로그아웃</button>
    </div>
  );
};

export default ProfilePage;

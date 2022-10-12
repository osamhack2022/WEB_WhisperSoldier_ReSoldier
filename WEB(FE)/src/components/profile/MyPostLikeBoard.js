import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { whisperSodlierSessionKey } from "../../lib/Const";
import { dbFunction, dbService } from "../../lib/FStore";
import { getProfilePageQuery } from "../../modules/GetProfilePageQuery";
import PostElement from "../post/PostElement";

const MyPostLikeBoard = () => {
  const { uid: currentUserUid } = JSON.parse(
    sessionStorage.getItem(whisperSodlierSessionKey)
  );
  const {
    query,
    collection,
    getDocs,
    limit,
    orderBy,
    startAfter,
    where,
    doc,
    getDoc,
  } = dbFunction;
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
        const postRef = doc(
          dbService,
          "WorryPost",
          commentLikeObj.associated_post_id
        );
        const postSnap = await getDoc(postRef);
        const postLikedObj = {
          ...postSnap.data(),
          id: postSnap.id,
        };
        setPostsLiked((prev) => [...prev, postLikedObj]);
      });
    }
  };

  const myPostLikeBoard = async (next) => {
    if (next) {
      try {
        console.log("showing next liked posts");
        const querySnapshot = await getDocs(
          getProfilePageQuery("PostLike", "user_id", 10, nextItemSnapShot)
        );
        setNextItemSnapShot(querySnapshot.docs[querySnapshot.docs.length - 1]);

        const afterSnapshot = await getDocs(
          // 이 부분을 getProfilePageQuery로 처리할 시 try-catch에서 에러를 잡아내지 못했기에 그대로 쿼리로 보존했다.
          query(
            collection(dbService, "PostLike"),
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
        }
        snapShotToLikedPosts(querySnapshot);
      } catch (e) {
        if (
          e.message ===
          "Function startAfter() called with invalid data. Unsupported field value: undefined"
        ) {
          setIsNextItemExist(false);
        } else {
          console.log("Other Error");
        }
      }
    } else {
      const firstSnapshot = await getDocs(
        getProfilePageQuery("PostLike", "user_id", 10)
      );
      setNextItemSnapShot(firstSnapshot.docs[firstSnapshot.docs.length - 1]);
      snapShotToLikedPosts(firstSnapshot);
      if (firstSnapshot.docs.length < 10) {
        setIsNextItemExist(false);
      } else {
        setIsNextItemExist(true);
      }
    }
  };

  const onClick = async (e) => {
    e.preventDefault();
    myPostLikeBoard(true);
  };
  useEffect(() => {
    myPostLikeBoard(false);
  }, []);

  return (
    <div>
      <h4>공감한 고민 글</h4> <hr />
      {postsLiked.length !== 0 ? (
        postsLiked.map((post) => (
          // <div key={post.id}>
          //   <Link to={`/post/${post.id}`}>{post.text}</Link>
          <PostElement key={post.id} post={post}></PostElement>
          /* <hr />
          </div> */
        ))
      ) : (
        <div>잠시만 기다려 주세요</div>
      )}
      {isNextItemExist && (
        <button onClick={onClick}>내가 공감한 포스트 10개 더 보기</button>
      )}
      <br />
    </div>
  );
};

export default MyPostLikeBoard;

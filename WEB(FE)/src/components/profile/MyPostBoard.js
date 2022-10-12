import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { whisperSodlierSessionKey } from "../../lib/Const";
import { dbFunction, dbService } from "../../lib/FStore";
import { getProfilePageQuery } from "../../modules/GetProfilePageQuery";
import PostElement from "../post/PostElement";

const MyPostBoard = () => {
  const { uid: currentUserUid } = JSON.parse(
    sessionStorage.getItem(whisperSodlierSessionKey)
  );
  const { query, collection, getDocs, limit, orderBy, startAfter, where } =
    dbFunction;
  const [postsCreated, setPostsCreated] = useState([]);
  const [nextItemSnapShot, setNextItemSnapShot] = useState({});
  const [isNextItemExist, setIsNextItemExist] = useState(false);

  const snapShotToCreatedPosts = (snapshot) => {
    if (snapshot) {
      snapshot.forEach((doc) => {
        const postObj = {
          ...doc.data(),
          id: doc.id,
        };
        setPostsCreated((prev) => [...prev, postObj]);
      });
    }
  };

  const myPostBoard = async (next) => {
    if (next) {
      try {
        console.log("showing next");
        const querySnapshot = await getDocs(
          getProfilePageQuery("WorryPost", "creator_id", 10, nextItemSnapShot)
        );
        setNextItemSnapShot(querySnapshot.docs[querySnapshot.docs.length - 1]);

        const afterSnapshot = await getDocs(
          // 이 부분을 getProfilePageQuery로 처리할 시 에러를 잡아내지 못했기에 그대로 쿼리로 보존했다.
          query(
            collection(dbService, "WorryPost"),
            orderBy("created_timestamp", "desc"),
            where("creator_id", "==", currentUserUid),
            startAfter(querySnapshot.docs[querySnapshot.docs.length - 1]),
            limit(1)
          )
        );
        if (afterSnapshot.docs.length === 0) {
          setIsNextItemExist(false);
        } else {
          setIsNextItemExist(true);
        }
        snapShotToCreatedPosts(querySnapshot);
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
        getProfilePageQuery("WorryPost", "creator_id", 10)
      );
      setNextItemSnapShot(firstSnapshot.docs[firstSnapshot.docs.length - 1]);
      snapShotToCreatedPosts(firstSnapshot);
      if (firstSnapshot.docs.length < 10) {
        setIsNextItemExist(false);
      } else {
        setIsNextItemExist(true);
      }
    }
  };

  const onClick = async (e) => {
    e.preventDefault();
    myPostBoard(true);
  };
  useEffect(() => {
    myPostBoard(false);
  }, []);

  return (
    <div>
      <h4>작성한 고민 글</h4> <hr />
      {postsCreated.length !== 0 ? (
        postsCreated.map((post) => (
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
        <button onClick={onClick}>내 포스트 10개 더 보기</button>
      )}
      <br />
    </div>
  );
};

export default MyPostBoard;

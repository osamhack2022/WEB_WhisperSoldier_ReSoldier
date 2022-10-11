import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { whisperSodlierSessionKey } from "../../lib/Const";
import { dbFunction, dbService } from "../../lib/FStore";
import { getProfilePageQuery } from "../../modules/GetProfilePageQuery";

const MyCommentBoard = () => {
  const { uid: currentUserUid } = JSON.parse(
    sessionStorage.getItem(whisperSodlierSessionKey)
  );
  const { query, collection, getDocs, limit, orderBy, startAfter, where } =
    dbFunction;
  const [commentsCreated, setCommentsCreated] = useState([]);
  const [nextItemSnapShot, setNextItemSnapShot] = useState({});
  const [isNextItemExist, setIsNextItemExist] = useState(false);

  const snapShotToCreatedComments = (snapshot) => {
    if (snapshot) {
      snapshot.forEach((doc) => {
        const postObj = {
          ...doc.data(),
          id: doc.id,
        };
        setCommentsCreated((prev) => [...prev, postObj]);
      });
    }
  };

  const myCommentBoard = async (next) => {
    if (next) {
      try {
        console.log("showing next comments created");
        const querySnapshot = await getDocs(
          getProfilePageQuery("Comment", "commentor_id", 10, nextItemSnapShot)
        );
        const afterSnapshot = await getDocs(
          // 이 부분을 getProfilePageQuery로 처리할 시 에러를 잡아내지 못했기에 그대로 쿼리로 보존했다.
          query(
            collection(dbService, "Comment"),
            orderBy("created_timestamp", "desc"),
            where("commentor_id", "==", currentUserUid),
            startAfter(querySnapshot.docs[querySnapshot.docs.length - 1]),
            limit(1)
          )
        );
        if (afterSnapshot.docs.length === 0) {
          setIsNextItemExist(false);
        } else {
          setIsNextItemExist(true);
        }
        setNextItemSnapShot(querySnapshot.docs[querySnapshot.docs.length - 1]);
        snapShotToCreatedComments(querySnapshot);
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
        getProfilePageQuery("Comment", "commentor_id", 10)
      );
      setNextItemSnapShot(firstSnapshot.docs[firstSnapshot.docs.length - 1]);
      snapShotToCreatedComments(firstSnapshot);
      if (firstSnapshot.docs.length < 10) {
        setIsNextItemExist(false);
      } else {
        setIsNextItemExist(true);
      }
    }
  };

  const onClick = async (e) => {
    e.preventDefault();
    myCommentBoard(true);
  };

  useEffect(() => {
    myCommentBoard(false);
  }, []);
  return (
    <div>
      <h4>작성한 댓글</h4> <hr />
      {commentsCreated.length !== 0 ? (
        commentsCreated.map((comment) => (
          <div key={comment.id}>
            <Link to={`/post/${comment.associated_post_id}`}>
              {comment.comment_text}
            </Link>
            <hr />
          </div>
        ))
      ) : (
        <div>잠시만 기다려 주세요</div>
      )}
      {isNextItemExist && (
        <button onClick={onClick}>내 댓글 10개 더 보기</button>
      )}
      <br />
    </div>
  );
};

export default MyCommentBoard;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { whisperSodlierSessionKey } from "../../lib/Const";
import { dbFunction, dbService } from "../../lib/FStore";
import { getProfilePageQuery } from "../../modules/GetProfilePageQuery";
import { InfoTextBox } from "../../styles/admin/ReportedPostStyle";
import { SectionTitle } from "../../styles/profile/ChangeProfileStyle";
import { ProfileCotentBox } from "../../styles/profile/ProfilePageStyle";
import MoreLoadPostButton from "../post/MoreLoadPostButton";
import CommentElement from "./CommentElement";

const MyCommentBoard = () => {
  const { uid: currentUserUid } = JSON.parse(
    sessionStorage.getItem(whisperSodlierSessionKey)
  );
  const { query, collection, getDocs, limit, orderBy, startAfter, where } =
    dbFunction;
  const [commentsCreated, setCommentsCreated] = useState([]);
  const [nextItemSnapShot, setNextItemSnapShot] = useState({});
  const [isNextItemExist, setIsNextItemExist] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
    setIsLoading(false);
  };

  const onNextMyComments = async (e) => {
    e.preventDefault();
    myCommentBoard(true);
  };

  useEffect(() => {
    setCommentsCreated([]);
    myCommentBoard(false);
  }, []);
  return (
    <>
      <ProfileCotentBox>
        <SectionTitle>작성한 댓글</SectionTitle>
        {isLoading ? (
          <InfoTextBox>잠시만 기다려 주세요</InfoTextBox>
        ) : commentsCreated.length !== 0 ? (
          commentsCreated.map((comment) => (
            <CommentElement key={comment.id} comment={comment}></CommentElement>
          ))
        ) : (
          <InfoTextBox>작성한 댓글이 존재하지 않습니다.</InfoTextBox>
        )}
      </ProfileCotentBox>
      {isNextItemExist && (
        <MoreLoadPostButton
          updatePostList={onNextMyComments}
          isMarginLeft={true}
          isComment={true}
        ></MoreLoadPostButton>
      )}
    </>
  );
};

export default MyCommentBoard;

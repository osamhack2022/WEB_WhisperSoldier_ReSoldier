import { useEffect, useState } from "react";
import { whisperSodlierSessionKey } from "../../lib/Const";
import { dbFunction, dbService } from "../../lib/FStore";
import { getProfilePageQuery } from "../../modules/GetProfilePageQuery";
import { InfoTextBox } from "../../styles/admin/ReportedPostStyle";
import { SectionTitle } from "../../styles/profile/ChangeProfileStyle";
import { ProfileCotentBox } from "../../styles/profile/ProfilePageStyle";
import MoreLoadPostButton from "../post/MoreLoadPostButton";
import CommentElement from "./CommentElement";

const MyCommentLikeBoard = () => {
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
  const [commentsLiked, setCommentsLiked] = useState([]);
  const [nextItemSnapShot, setNextItemSnapShot] = useState({});
  const [isNextItemExist, setIsNextItemExist] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const snapshotToLikedComments = async (snapshot) => {
    if (snapshot) {
      snapshot.forEach(async (document) => {
        const commentLikeObj = {
          ...document.data(),
          id: document.id,
        };
        const commentRef = doc(
          dbService,
          "Comment",
          commentLikeObj.associated_comment_id
        );
        const commentSnap = await getDoc(commentRef);
        const commentLikedObj = {
          ...commentSnap.data(),
          id: commentSnap.id,
          like_timestamp: document.data().created_timestamp,
        };
        setCommentsLiked((prev) => [...prev, commentLikedObj]);
      });
    }
  };

  const myCommentLikeBoard = async (next) => {
    if (next) {
      try {
        console.log("showing next liked comments");
        const querySnapshot = await getDocs(
          getProfilePageQuery("CommentLike", "user_id", 10, nextItemSnapShot)
        );
        setNextItemSnapShot(querySnapshot.docs[querySnapshot.docs.length - 1]);

        const afterSnapshot = await getDocs(
          query(
            collection(dbService, "CommentLike"),
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
        snapshotToLikedComments(querySnapshot);
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
        getProfilePageQuery("CommentLike", "user_id", 10)
      );
      setNextItemSnapShot(firstSnapshot.docs[firstSnapshot.docs.length - 1]);
      snapshotToLikedComments(firstSnapshot);
      if (firstSnapshot.docs.length < 10) {
        setIsNextItemExist(false);
      } else {
        setIsNextItemExist(true);
      }
    }
    setIsLoading(false);
  };

  const onNextMyLikeComments = async (e) => {
    e.preventDefault();
    myCommentLikeBoard(true);
  };

  useEffect(() => {
    setCommentsLiked([]);
    myCommentLikeBoard(false);
  }, []);
  return (
    <>
      <ProfileCotentBox>
        <SectionTitle>공감한 댓글</SectionTitle>
        {isLoading ? (
          <InfoTextBox>잠시만 기다려 주세요</InfoTextBox>
        ) : commentsLiked.length !== 0 ? (
          commentsLiked.map((comment) => (
            <CommentElement key={comment.id} comment={comment}></CommentElement>
          ))
        ) : (
          <InfoTextBox>공감한 댓글이 존재하지 않습니다.</InfoTextBox>
        )}
      </ProfileCotentBox>
      {isNextItemExist && (
        <MoreLoadPostButton
          updatePostList={onNextMyLikeComments}
          isMarginLeft={true}
          isComment={true}
        ></MoreLoadPostButton>
      )}
    </>
  );
};

export default MyCommentLikeBoard;

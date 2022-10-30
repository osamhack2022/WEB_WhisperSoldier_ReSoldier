import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { whisperSodlierSessionKey } from "../../lib/Const";
import { dbFunction, dbService } from "../../lib/FStore";
import { getProfilePageQuery } from "../../modules/GetProfilePageQuery";
import { InfoTextBox } from "../../styles/admin/ReportedPostStyle";
import { SectionTitle } from "../../styles/profile/ChangeProfileStyle";
import { ProfileCotentBox } from "../../styles/profile/ProfilePageStyle";
import MoreLoadPostButton from "../post/MoreLoadPostButton";
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
  const [isLoading, setIsLoading] = useState(true);

  const snapShotToLikedPosts = (snapshot) => {
    if (snapshot) {
      snapshot.forEach(async (document) => {
        const commentLikeObj = {
          ...document.data(),
          id: document.id,
        };
        const postRef = doc(
          dbService,
          "WorryPost",
          commentLikeObj.associated_post_id
        );
        const postSnap = await getDoc(postRef);
        const postLikedObj = {
          ...postSnap.data(),
          id: postSnap.id,
          like_timestamp: document.data().created_timestamp,
        };
        setPostsLiked((prev) => [...prev, postLikedObj]);
      });
    }
  };

  const myPostLikeBoard = async (next) => {
    if (next) {
      try {
        const querySnapshot = await getDocs(
          getProfilePageQuery("PostLike", "user_id", 10, nextItemSnapShot)
        );

        snapShotToLikedPosts(querySnapshot);
        setNextItemSnapShot(querySnapshot.docs[querySnapshot.docs.length - 1]);

        const afterSnapshot = await getDocs(
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
    setIsLoading(false);
  };

  const onNextMyLikePosts = async (e) => {
    e.preventDefault();
    myPostLikeBoard(true);
  };

  useEffect(() => {
    myPostLikeBoard(false);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <ProfileCotentBox>
        <SectionTitle>공감한 고민 글</SectionTitle>
        {isLoading ? (
          <InfoTextBox>잠시만 기다려 주세요</InfoTextBox>
        ) : postsLiked.length !== 0 ? (
          postsLiked.map((post) => (
            <PostElement key={post.id} post={post}></PostElement>
          ))
        ) : (
          <InfoTextBox>공감한 포스트가 존재하지 않습니다.</InfoTextBox>
        )}
      </ProfileCotentBox>
      {isNextItemExist && (
        <MoreLoadPostButton
          updatePostList={onNextMyLikePosts}
          isMarginLeft={true}
        ></MoreLoadPostButton>
      )}
    </>
  );
};

export default MyPostLikeBoard;

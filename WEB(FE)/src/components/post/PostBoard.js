import { useState, useEffect, useCallback } from "react";
import { dbService, dbFunction } from "../../lib/FStore";
import PostBoardTitleContainer from "./PostBoardTilteContainer";
import PostBoardBodyContainer from "./PostBoardBodyContainer";
import PostElement from "./PostElement";
import { SideOptionFormForPostBoard } from "../common/SideOptionForm";
import MoreLoadPostButton from "./MoreLoadPostButton";
import { useRecoilState } from "recoil";
import {
  CountCurrentPost,
  CurrentScrollPos,
  IsNextPostExistRecoil,
  PostsRecoil,
} from "../../store/PostStore";
import {
  PostBoardContainer,
  SideOptionContainer,
} from "../../styles/post/PostBoardStyle";

const PostBoard = ({ isDesktop, isSmallDesktop, isTablet }) => {
  const { query, collection, getDocs, limit, orderBy, startAfter } = dbFunction;

  const [posts, setPosts] = useState([]);
  const [nextPostSnapShot, setNextPostSnapShot] = useState({});
  const [isNextPostExist, setIsNextPostExist] = useState(false);
  const [isShowContainer, setIsShowContainer] = useState(false);

  const [postsRecoil, setPostsRecoil] = useRecoilState(PostsRecoil);
  const [countCurrentPost, setCountCurrentPost] =
    useRecoilState(CountCurrentPost);
  const [isNextPostExistRecoil, setIsNextPostExistRecoil] = useRecoilState(
    IsNextPostExistRecoil
  );
  const [currentScrollPos, setCurrentScrollPos] =
    useRecoilState(CurrentScrollPos);

  const snapshotToPosts = useCallback((snapshot) => {
    if (snapshot) {
      snapshot.forEach((doc) => {
        const postObj = {
          ...doc.data(),
          id: doc.id,
        };
        setPosts((prev) => [...prev, postObj]);
        setPostsRecoil((prev) => [...prev, postObj]);
      });
    }
  }, []);

  const getQueryWithDescendingTime = useCallback(
    (limitDocs, startAfterPoint) => {
      if (startAfterPoint) {
        return query(
          collection(dbService, "WorryPost"),
          orderBy("created_timestamp", "desc"),
          startAfter(startAfterPoint),
          limit(limitDocs)
        );
      } else {
        return query(
          collection(dbService, "WorryPost"),
          orderBy("created_timestamp", "desc"),
          limit(limitDocs)
        );
      }
    },
    [dbService]
  );

  const getFirst = async () => {
    const first = getQueryWithDescendingTime(10);
    const firstSnapshot = await getDocs(first);
    setNextPostSnapShot(firstSnapshot.docs[firstSnapshot.docs.length - 1]);
    snapshotToPosts(firstSnapshot);
    setIsNextPostExist(true);
  };

  const moveNext = async () => {
    const next = getQueryWithDescendingTime(10, nextPostSnapShot);
    const querySnapshot = await getDocs(next);
    setNextPostSnapShot(querySnapshot.docs[querySnapshot.docs.length - 1]);
    const afterQuery = getQueryWithDescendingTime(
      1,
      querySnapshot.docs[querySnapshot.docs.length - 1]
    );
    const afterSnapshot = await getDocs(afterQuery);
    setCountCurrentPost((prev) => prev + 10);
    if (afterSnapshot.docs.length === 0) {
      setIsNextPostExist(false);
      setIsNextPostExistRecoil(false);
    } else {
      setIsNextPostExist(true);
      setIsNextPostExistRecoil(true);
    }
    snapshotToPosts(querySnapshot);
  };

  const onClick = async (e) => {
    e.preventDefault();
    moveNext();
  };

  const onShowSideContainer = useCallback(() => {
    setIsShowContainer((prev) => !prev);
  }, []);

  const recoverPost = async () => {
    const recoverQuery = query(
      collection(dbService, "WorryPost"),
      orderBy("created_timestamp", "desc"),
      limit(countCurrentPost)
    );
    const recoverSnapshot = await getDocs(recoverQuery);
    setNextPostSnapShot(recoverSnapshot.docs[recoverSnapshot.docs.length - 1]);
    const afterQuery = getQueryWithDescendingTime(
      1,
      recoverSnapshot.docs[recoverSnapshot.docs.length - 1]
    );
    const afterSnapshot = await getDocs(afterQuery);
    if (afterSnapshot.docs.length === 0) {
      setIsNextPostExist(false);
      setIsNextPostExistRecoil(false);
    } else {
      setIsNextPostExist(true);
      setIsNextPostExistRecoil(true);
    }
  };

  useEffect(() => {
    if (postsRecoil.length === 0) {
      getFirst();
    } else {
      setPosts(postsRecoil);
      setIsNextPostExist(isNextPostExistRecoil);
      recoverPost();
      setTimeout(
        () => window.scrollTo(currentScrollPos, currentScrollPos),
        100
      );
      setCurrentScrollPos(0);
    }
  }, []);

  if (posts) {
    return (
      <>
        <PostBoardContainer isDesktop={isDesktop} isTablet={isTablet}>
          <PostBoardTitleContainer
            isDesktop={isDesktop}
            isTablet={isTablet}
            onShowSideContainer={onShowSideContainer}
            isShowContainer={isShowContainer}
          >
            고민 게시판
          </PostBoardTitleContainer>
          {!isTablet && isShowContainer && (
            <SideOptionContainer isDesktop={isDesktop} isTablet={isTablet}>
              <SideOptionFormForPostBoard></SideOptionFormForPostBoard>
            </SideOptionContainer>
          )}
          <PostBoardBodyContainer>
            {posts.length !== 0 ? (
              posts.map((post) => (
                <PostElement key={post.id} post={post}></PostElement>
              ))
            ) : (
              <div>잠시만 기다려 주세요</div>
            )}
          </PostBoardBodyContainer>
          {isNextPostExist && (
            <MoreLoadPostButton updatePostList={onClick}></MoreLoadPostButton>
          )}
        </PostBoardContainer>
        {isTablet && (
          <SideOptionContainer isDesktop={isDesktop} isTablet={isTablet}>
            <SideOptionFormForPostBoard></SideOptionFormForPostBoard>
          </SideOptionContainer>
        )}
      </>
    );
  } else {
    return <div>{"[개발]불러올 포스트가 없습니다ㅠ"}</div>;
  }
};

export default PostBoard;

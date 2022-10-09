import { useState, useEffect, useCallback } from "react";
import { dbFunction } from "../../lib/FStore";
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
  IsUpdatePostList,
  PostsRecoil,
} from "../../store/PostStore";
import {
  PostBoardContainer,
  SideOptionContainer,
} from "../../styles/post/PostBoardStyle";
import { useMediaQuery } from "react-responsive";
import { TabletQuery } from "../../lib/Const";
import { getSearchQuery } from "../../modules/GetSearchQuery";
import getTimeDepth from "../../modules/GetTimeDepth";

const PostBoard = () => {
  const isTablet = useMediaQuery({ query: TabletQuery });
  const { getDocs } = dbFunction;

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
  const [isUpdatePostList, setIsUpdatePostList] =
    useRecoilState(IsUpdatePostList);

  const [timeDepthValue, setTimeDepthValue] = useState("week");
  const [timeDepthSelect, setTimeDepthSelect] = useState({
    week: true,
    month: false,
    halfYear: false,
    fullYear: false,
    allTime: false,
  });
  const [orderDescOrAsc, setOrderDescOrAsc] = useState("desc");
  const [isResultDesc, setIsResultDesc] = useState(true);

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
    // eslint-disable-next-line
  }, []);

  const getFirst = async () => {
    const firstSnapshot = await getDocs(
      getSearchQuery(
        false,
        orderDescOrAsc,
        getTimeDepth(timeDepthValue),
        null,
        10
      )
    );
    setNextPostSnapShot(firstSnapshot.docs[firstSnapshot.docs.length - 1]);
    snapshotToPosts(firstSnapshot);
    setIsNextPostExist(true);
  };

  const moveNext = async () => {
    const querySnapshot = await getDocs(
      getSearchQuery(
        false,
        orderDescOrAsc,
        getTimeDepth(timeDepthValue),
        nextPostSnapShot,
        10
      )
    );
    setNextPostSnapShot(querySnapshot.docs[querySnapshot.docs.length - 1]);

    const afterSnapshot = await getDocs(
      getSearchQuery(
        false,
        orderDescOrAsc,
        getTimeDepth(timeDepthValue),
        querySnapshot.docs[querySnapshot.docs.length - 1],
        1
      )
    );

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
    const recoverSnapshot = await getDocs(
      getSearchQuery(
        false,
        orderDescOrAsc,
        getTimeDepth(timeDepthValue),
        null,
        countCurrentPost
      )
    );
    setNextPostSnapShot(recoverSnapshot.docs[recoverSnapshot.docs.length - 1]);
    const afterSnapshot = await getDocs(
      getSearchQuery(
        false,
        orderDescOrAsc,
        getTimeDepth(timeDepthValue),
        recoverSnapshot.docs[recoverSnapshot.docs.length - 1],
        1
      )
    );
    if (afterSnapshot.docs.length === 0) {
      setIsNextPostExist(false);
      setIsNextPostExistRecoil(false);
    } else {
      setIsNextPostExist(true);
      setIsNextPostExistRecoil(true);
    }
  };

  const onSearchSubmit = () => {
    setPosts([]);
    setNextPostSnapShot({});
    setIsNextPostExist(false);
    setPostsRecoil([]);
    setCountCurrentPost(10);
    setIsNextPostExist(false);
    setIsUpdatePostList(false);
    setCurrentScrollPos(0);
    getFirst();
  };

  useEffect(() => {
    console.log("[PostBoard.js]", isUpdatePostList);
    if (postsRecoil.length === 0 || isUpdatePostList) {
      if (isUpdatePostList) {
        setPosts([]);
        setNextPostSnapShot({});
        setIsNextPostExist(false);
        setPostsRecoil([]);
        setCountCurrentPost(10);
        setIsNextPostExist(false);
        setIsUpdatePostList(false);
        setCurrentScrollPos(0);
      }
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
    // eslint-disable-next-line
  }, []);

  if (posts) {
    return (
      <>
        <PostBoardContainer>
          <PostBoardTitleContainer
            onShowSideContainer={onShowSideContainer}
            isShowContainer={isShowContainer}
          >
            고민 게시판
          </PostBoardTitleContainer>
          {!isTablet && isShowContainer && (
            <SideOptionContainer>
              <SideOptionFormForPostBoard
                onSearchSubmit={onSearchSubmit}
                setTimeDepthValue={setTimeDepthValue}
                timeDepthSelect={timeDepthSelect}
                setTimeDepthSelect={setTimeDepthSelect}
                isResultDesc={isResultDesc}
                setIsResultDesc={setIsResultDesc}
                setOrderDescOrAsc={setOrderDescOrAsc}
              ></SideOptionFormForPostBoard>
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
          <SideOptionContainer>
            <SideOptionFormForPostBoard
              onSearchSubmit={onSearchSubmit}
              setTimeDepthValue={setTimeDepthValue}
              timeDepthSelect={timeDepthSelect}
              setTimeDepthSelect={setTimeDepthSelect}
              isResultDesc={isResultDesc}
              setIsResultDesc={setIsResultDesc}
              setOrderDescOrAsc={setOrderDescOrAsc}
            ></SideOptionFormForPostBoard>
          </SideOptionContainer>
        )}
      </>
    );
  } else {
    return <div>{"[개발]불러올 포스트가 없습니다ㅠ"}</div>;
  }
};

export default PostBoard;

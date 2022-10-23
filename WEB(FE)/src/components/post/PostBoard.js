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
  PostListSortOption,
  PostsRecoil,
} from "../../store/PostStore";
import {
  PostBoardContainer,
  SideOptionContainer,
} from "../../styles/post/PostBoardStyle";
import { useMediaQuery } from "react-responsive";
import { TabletQuery } from "../../lib/Const";
import { getSearchQuery, getTimeDepthObj } from "../../modules/GetSearchQuery";
import getTimeDepth from "../../modules/GetTimeDepth";
// import { useLocation } from "react-router-dom";

const PostBoard = () => {
  const isTablet = useMediaQuery({ query: TabletQuery });
  //let { params } = useParams();
  // const location = useLocation();
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
  const [postListSortOption, setPostListSortOption] =
    useRecoilState(PostListSortOption);

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

  const snapshotToPosts = (snapshot) => {
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
  };

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
    if (firstSnapshot.docs.length < 10) {
      setIsNextPostExist(false);
      setIsNextPostExistRecoil(false);
    } else {
      try {
        const nextPostsSnapshot = await getDocs(
          getSearchQuery(
            false,
            orderDescOrAsc,
            getTimeDepth(timeDepthValue),
            firstSnapshot.docs[firstSnapshot.docs.length - 1],
            1
          )
        );
        if (nextPostsSnapshot.docs.length === 0) {
          console.log("no more post data!");
          setIsNextPostExist(false);
          setIsNextPostExistRecoil(false);
        } else {
          setIsNextPostExist(true);
          setIsNextPostExistRecoil(true);
          console.log("more post data exist!");
        }
      } catch (e) {
        console.log("error with get Post!");
      }
    }
    setPostListSortOption((prev) => ({
      ...prev,
      timeSettingValue: timeDepthValue,
      descSettingValue: isResultDesc,
    }));
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

    setPostListSortOption((prev) => ({
      ...prev,
      timeSettingValue: timeDepthValue,
      descSettingValue: isResultDesc,
    }));
  };

  const onClick = async (e) => {
    e.preventDefault();
    moveNext();
  };

  const onShowSideContainer = useCallback(() => {
    setIsShowContainer((prev) => !prev);
  }, []);

  const recoverPost = async () => {
    console.log(
      "recoverPost : ",
      postListSortOption.descSettingValue ? "desc" : "asc",
      postListSortOption.timeSettingValue,
      countCurrentPost
    );
    const recoverSnapshot = await getDocs(
      getSearchQuery(
        false,
        postListSortOption.descSettingValue ? "desc" : "asc",
        getTimeDepth(postListSortOption.timeSettingValue),
        null,
        countCurrentPost
      )
    );
    console.log(recoverSnapshot);
    setNextPostSnapShot(recoverSnapshot.docs[recoverSnapshot.docs.length - 1]);
    const afterSnapshot = await getDocs(
      getSearchQuery(
        false,
        postListSortOption.descSettingValue ? "desc" : "asc",
        getTimeDepth(postListSortOption.timeSettingValue),
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
    setIsUpdatePostList((prev) => ({ ...prev, newestPage: false }));
    setCurrentScrollPos(0);
    getFirst();
  };

  useEffect(() => {
    if (postsRecoil.length === 0 || isUpdatePostList.newestPage) {
      console.log("frsh or refresh data!");
      if (isUpdatePostList.newestPage) {
        setPosts([]);
        setNextPostSnapShot({});
        setIsNextPostExist(false);
        setPostsRecoil([]);
        setCountCurrentPost(10);
        setIsNextPostExist(false);
        setIsUpdatePostList((prev) => ({ ...prev, newestPage: false }));
        setCurrentScrollPos(0);
        setTimeDepthValue(postListSortOption.timeSettingValue);
        setTimeDepthSelect(
          getTimeDepthObj(postListSortOption.timeSettingValue)
        );
        setOrderDescOrAsc(postListSortOption.descSettingValue ? "desc" : "asc");
        setIsResultDesc(postListSortOption.descSettingValue);
      }
      getFirst();
    } else {
      console.log("get global state!");
      setPosts(postsRecoil);
      setIsNextPostExist(isNextPostExistRecoil);
      setTimeDepthValue(postListSortOption.timeSettingValue);
      setTimeDepthSelect(getTimeDepthObj(postListSortOption.timeSettingValue));
      setOrderDescOrAsc(postListSortOption.descSettingValue ? "desc" : "asc");
      setIsResultDesc(postListSortOption.descSettingValue);
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
            최신 고민 게시판
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

import { useState, useEffect, useCallback } from "react";
import { dbFunction, dbService } from "../../lib/FStore";
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
import { useLocation } from "react-router-dom";
import { limit, orderBy, startAfter } from "firebase/firestore";

const PopularPostBoard = () => {
  const isTablet = useMediaQuery({ query: TabletQuery });
  //let { params } = useParams();
  const location = useLocation();
  const { getDocs, query, collection,  } = dbFunction;

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
  const [nextLikeFliterPostSnapShot, setNextLikeFilterPostSnapShot] = useState({});
  const [isNextLikeOrderPostExist, setIsNextLikeOrderPostExist] = useState(false);
  const [likePostCountIndex, setLikePostCountIndex] = useState(0);

  const getFirstTen = async () => {
    let q = query(collection(dbService, "WorryPost"),
      orderBy("like_count", "desc"),
      orderBy("created_timestamp", orderDescOrAsc),
      limit(10)
    )

    setLikePostCountIndex(0); // setState는 비동기이기 때문에 while문같은 곳에 사용하면 안된다. 그러면 다른 방법을 찾아야된다. 
    // 
    while (likePostCountIndex < 10) { // while문을 돌릴 수 있는 다른 로직을 찾는 중이다.
      let idx = 0
      const rangeSnap = await getDocs(q);
      console.log("Length of rangeSnap: ", rangeSnap.docs.length); 
      /*처음 가져올때는, 전체 게시글이 10개 미만이 아닌 이상 무조건 10개를 가져오는게 맞다.*/
      if (rangeSnap) {
        rangeSnap.forEach((doc) => {
          const postObj = {
            ...doc.data(),
            id: doc.id,
          };
          console.log("current timeDepth from date is: ", getTimeDepth(timeDepthValue));
          console.log("current doc timestamp is: ", postObj.created_timestamp);
          if (postObj.created_timestamp >= getTimeDepth(timeDepthValue) && likePostCountIndex < 10) {
            setPosts((prev) => [...prev, postObj]);
            setPostsRecoil((prev) => [...prev, postObj]);
            idx = idx + 1;
            console.log("after idx change");
            console.log("현재까지 문서 중 기간 제한을 통과한 문서 개수: ", idx)
            setLikePostCountIndex((prev) => (prev + 1));
            console.log("after FilterIndex change");
          }
          console.log("after IF");
        })
          (idx !== 0 ? setNextLikeFilterPostSnapShot(rangeSnap.docs[idx - 1]) : setNextLikeFilterPostSnapShot(rangeSnap.docs[rangeSnap.docs.length - 1]))
        console.log("NextFilterPost: ", nextLikeFliterPostSnapShot);
      
        //쿼리 업데이트
        q = query(collection(dbService, "WorryPost"),
          orderBy("like_count", "desc"),
          orderBy("created_timestamp", orderDescOrAsc),
          startAfter(nextLikeFliterPostSnapShot),
          limit(10)
        )
      } else {
        // 가져올 스냅샷이 존재하지 않음
      }
    }
  };
    // 테스트 통과하면 "다음 10개 보기"를 위해 nextLikeOrderPostsSnapshot 지정해주기
  
  const snapshotToPosts = (snapshot) => {
    if (snapshot) {
      snapshot.forEach((doc) => {
        const postObj = {
          ...doc.data(),
          id: doc.id,
        };
        console.log("current timeDepth from date is: ", getTimeDepth(timeDepthValue));
        console.log("current doc timestamp is: ", postObj.created_timestamp);
        if (postObj.created_timestamp >= getTimeDepth(timeDepthValue)) {
          setPosts((prev) => [...prev, postObj]);
          setPostsRecoil((prev) => [...prev, postObj]);
        }
        /* setPosts((prev) => [...prev, postObj]);
        setPostsRecoil((prev) => [...prev, postObj]); */
      }
      );
      ///console.log("TestTimestampPost: ", posts[0].created_timestamp);
      /* setPosts(posts.filter((post) => (post.created_timestamp < getTimeDepth(timeDepthValue))));
      setPostsRecoil(postsRecoil.filter((post) => (post.created_timestamp < getTimeDepth(timeDepthValue)))); */
    }
  };

  const getFirst = async () => {
    const firstSnapshot = await getDocs(
      getSearchQuery(true, orderDescOrAsc, null, null, 10)
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
            true,
            orderDescOrAsc,
            null,
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
  };

  const moveNext = async () => {
    const querySnapshot = await getDocs(
      getSearchQuery(true, orderDescOrAsc, null, nextPostSnapShot, 10)
    );
    setNextPostSnapShot(querySnapshot.docs[querySnapshot.docs.length - 1]);

    const afterSnapshot = await getDocs(
      getSearchQuery(
        true,
        orderDescOrAsc,
        null,
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
    const recoverSnapshot = await getDocs(
      getSearchQuery(true, orderDescOrAsc, null, null, countCurrentPost)
    );
    console.log(recoverSnapshot);
    setNextPostSnapShot(recoverSnapshot.docs[recoverSnapshot.docs.length - 1]);
    const afterSnapshot = await getDocs(
      getSearchQuery(
        true,
        orderDescOrAsc,
        null,
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
    setIsUpdatePostList((prev) => ({ ...prev, popularPage: false }));
    setCurrentScrollPos(0);
    getFirst();
  };

  useEffect(() => {
    console.log("[PostBoard-popular.js]", isUpdatePostList.popularPage);

    if (postsRecoil.length === 0 || isUpdatePostList.popularPage) {
      console.log("frsh or refresh data!");
      if (isUpdatePostList.newestPage) {
        setPosts([]);
        setNextPostSnapShot({});
        setIsNextPostExist(false);
        setPostsRecoil([]);
        setCountCurrentPost(10);
        setIsNextPostExist(false);
        setIsUpdatePostList((prev) => ({ ...prev, popularPage: false }));
        setCurrentScrollPos(0);
      }
      //getFirst();
      getFirstTen();
    } else {
      console.log("get global state!");
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
            인기 고민 게시판
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

export default PopularPostBoard;

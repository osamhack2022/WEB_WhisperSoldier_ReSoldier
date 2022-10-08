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
  IsUpdatePostList,
  PostsRecoil,
} from "../../store/PostStore";
import {
  PostBoardContainer,
  SideOptionContainer,
} from "../../styles/post/PostBoardStyle";
import { Timestamp, where } from "firebase/firestore";

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
  const [isUpdatePostList, setIsUpdatePostList] =
    useRecoilState(IsUpdatePostList);
    
  const [timeDepthValue, setTimeDepthValue] = useState("week")
  const [timeDepthSelectObj, setTimeDepthSelectObj] = useState({
    week: true,
    month: false,
    halfYear: false,
    fullYear: false,
    allTime: false,
  })
  const [orderDescOrAsc, setOrderDescOrAsc] = useState("desc");
	const [isResultDesc, setIsResultDesc] = useState(true);

  const now = new Date();
  const getTimeDepth = (critera) => {
    switch(critera) {
      case 'week':
        return(Timestamp.fromDate(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)));
      case 'month':
        return(Timestamp.fromDate(new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())));
      case 'halfYear':
        return(Timestamp.fromDate(new Date(now.getFullYear(), now.getMonth() - 6, now.getDate())));
      case 'fullYear':
        return(Timestamp.fromDate(new Date(now.getFullYear() - 1, now.getMonth(), now.getDate() - 7)));
      case 'allTime':
        return(Timestamp.fromDate(new Date(0)));
      default:
        return(Timestamp.fromDate(new Date(0)));
    }
  }
  console.log("Timestamp : ", getTimeDepth());

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
    (limitDocs, order, searchTimeDepth=getTimeDepth(), startAfterPoint) => {
      
        if (startAfterPoint) {
          return query(
            collection(dbService, "WorryPost"),
            orderBy("created_timestamp", order),
            where("created_timestamp", ">=", searchTimeDepth),
            startAfter(startAfterPoint),
            limit(limitDocs)
          );
        } else {
          return query(
            collection(dbService, "WorryPost"),
            orderBy("created_timestamp", order),
            where("created_timestamp", ">=", searchTimeDepth),
            limit(limitDocs)
          );
        }
      
    },
    [dbService]
  );

  const getFirst = async () => {
    const first = getQueryWithDescendingTime(10, orderDescOrAsc, getTimeDepth(timeDepthValue));
    const firstSnapshot = await getDocs(first);
    setNextPostSnapShot(firstSnapshot.docs[firstSnapshot.docs.length - 1]);
    snapshotToPosts(firstSnapshot);
    setIsNextPostExist(true);
  };

  const moveNext = async () => {
    const next = getQueryWithDescendingTime(10, orderDescOrAsc, getTimeDepth(timeDepthValue), nextPostSnapShot);
    const querySnapshot = await getDocs(next);
    setNextPostSnapShot(querySnapshot.docs[querySnapshot.docs.length - 1]);
    const afterQuery = getQueryWithDescendingTime(
      1,
      orderDescOrAsc,
      getTimeDepth(timeDepthValue),
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
    const recoverQuery = getQueryWithDescendingTime(
      countCurrentPost,
      orderDescOrAsc,
      getTimeDepth(timeDepthValue)
    )
    const recoverSnapshot = await getDocs(recoverQuery);
    setNextPostSnapShot(recoverSnapshot.docs[recoverSnapshot.docs.length - 1]);
    const afterQuery = getQueryWithDescendingTime(
      1,
      orderDescOrAsc,
      getTimeDepth(timeDepthValue),
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

  
const onSelectWeek = () => {
	setTimeDepthValue('week');
	setTimeDepthSelectObj({
		week: true,
		month: false,
		halfYear: false,
		fullYear: false,
		allTime: false,
	});
}
const onSelectMonth = () => {
	setTimeDepthValue('month');
	setTimeDepthSelectObj({
		week: false,
		month: true,
		halfYear: false,
		fullYear: false,
		allTime: false,
	});
}
const onSelectHalfYear = () => {
	setTimeDepthValue('halfYear');
	setTimeDepthSelectObj({
		week: false,
		month: false,
		halfYear: true,
		fullYear: false,
		allTime: false,
	});
}
const onSelectFullYear = () => {
	setTimeDepthValue('fullYear');
	setTimeDepthSelectObj({
		week: false,
		month: false,
		halfYear: false,
		fullYear: true,
		allTime: false,
	});
}
const onSelectAllTime = () => {
	setTimeDepthValue('allTime');
	setTimeDepthSelectObj({
		week: false,
		month: false,
		halfYear: false,
		fullYear: false,
		allTime: true,
	});
}

	const onSelectDesc = () => {
    setIsResultDesc(true);
    setOrderDescOrAsc("desc");
	}
	const onSelectAsc = () => {
    setIsResultDesc(false);
    setOrderDescOrAsc("asc");
	}

  const firstAction = () => {
    setPosts([]);
    getFirst();
  }

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
              <SideOptionFormForPostBoard
              onSelectWeek={onSelectWeek}
              onSelectMonth={onSelectMonth}
              onSelectHalfYear={onSelectHalfYear}
              onSelectFullYear={onSelectFullYear}
              onSelectAllTime={onSelectAllTime}
              timeDepthSelect={timeDepthSelectObj}
              onSelectDesc={onSelectDesc}
              onSelectAsc={onSelectAsc}
              isResultDesc={isResultDesc}
              onSearchSubmit={firstAction}
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
          <SideOptionContainer isDesktop={isDesktop} isTablet={isTablet}>
            <SideOptionFormForPostBoard
            onSelectWeek={onSelectWeek}
            onSelectMonth={onSelectMonth}
            onSelectHalfYear={onSelectHalfYear}
            onSelectFullYear={onSelectFullYear}
            onSelectAllTime={onSelectAllTime}
            timeDepthSelect={timeDepthSelectObj}
            onSelectDesc={onSelectDesc}
            onSelectAsc={onSelectAsc}
            isResultDesc={isResultDesc}
            onSearchSubmit={firstAction}
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

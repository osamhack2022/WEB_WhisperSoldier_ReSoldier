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
import getTimeDepth from "../../modules/GetTimeDepth";
import { InfoTextBox } from "../../styles/admin/ReportedPostStyle";

const FIRSTSEARCH = true;
const NONFIRSTSEARCH = false;

const PopularPostBoard = () => {
  const isTablet = useMediaQuery({ query: TabletQuery });
  const { getDocs, query, collection, orderBy, startAfter } = dbFunction;

  const [posts, setPosts] = useState([]);
  const [nextPostSnapShot, setNextPostSnapShot] = useState({});
  const [isNextPostExist, setIsNextPostExist] = useState(false);
  const [isShowContainer, setIsShowContainer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  const getTenPopularPost = async (firstSearch) => {
    let popularPostSnapshpot;
    if (firstSearch) {
      popularPostSnapshpot = await getDocs(
        query(
          collection(dbService, "WorryPost"),
          orderBy("like_count", "desc"),
          orderBy("created_timestamp", "desc")
        )
      );
    } else {
      popularPostSnapshpot = await getDocs(
        query(
          collection(dbService, "WorryPost"),
          orderBy("like_count", "desc"),
          orderBy("created_timestamp", "desc"),
          startAfter(nextPostSnapShot)
        )
      );
    }

    if (popularPostSnapshpot && popularPostSnapshpot) {
      let count = 0;
      let totalCount = 0;
      for (let i = 0; i < popularPostSnapshpot.docs.length; i++) {
        const postObj = {
          ...popularPostSnapshpot.docs[i].data(),
          id: popularPostSnapshpot.docs[i].id,
        };
        if (postObj.created_timestamp >= getTimeDepth(timeDepthValue)) {
          if (count < 10) {
            setPosts((prev) => [...prev, postObj]);
            count += 1;
            totalCount += 1;
          } else if (count === 10) {
            count += 1;
            totalCount += 1;
            setNextPostSnapShot(popularPostSnapshpot.docs[i - 1]);
          } else {
            totalCount += 1;
          }
        }
      }
      if (count > 10) {
        count -= 1;
      }
      if (totalCount <= 10) {
        setIsNextPostExist(false);
      } else {
        setIsNextPostExist(true);
      }
    } else {
      setIsNextPostExist(false);
    }
    setIsLoading(false);
  };

  const onClick = async (e) => {
    e.preventDefault();
    getTenPopularPost(NONFIRSTSEARCH);
  };

  const onShowSideContainer = useCallback(() => {
    setIsShowContainer((prev) => !prev);
  }, []);

  // const recoverPost = async () => {
  //   const recoverSnapshot = await getDocs(
  //     getSearchQuery(true, orderDescOrAsc, null, null, countCurrentPost)
  //   );
  //   console.log(recoverSnapshot);
  //   setNextPostSnapShot(recoverSnapshot.docs[recoverSnapshot.docs.length - 1]);
  //   const afterSnapshot = await getDocs(
  //     getSearchQuery(
  //       true,
  //       orderDescOrAsc,
  //       null,
  //       recoverSnapshot.docs[recoverSnapshot.docs.length - 1],
  //       1
  //     )
  //   );
  //   if (afterSnapshot.docs.length === 0) {
  //     setIsNextPostExist(false);
  //     setIsNextPostExistRecoil(false);
  //   } else {
  //     setIsNextPostExist(true);
  //     setIsNextPostExistRecoil(true);
  //   }
  //   setIsLoading(false);
  // };

  const onSearchSubmit = () => {
    setPosts([]);
    setNextPostSnapShot({});
    setIsNextPostExist(false);
    setPostsRecoil([]);
    setCountCurrentPost(10);
    setIsNextPostExist(false);
    setIsUpdatePostList((prev) => ({ ...prev, popularPage: false }));
    setCurrentScrollPos(0);
    getTenPopularPost(FIRSTSEARCH);
  };

  useEffect(() => {
    // if (postsRecoil.length === 0 || isUpdatePostList.popularPage)
    if (true) {
      if (isUpdatePostList.newestPage) {
        setPostsRecoil([]);
        setCountCurrentPost(10);
        setIsNextPostExist(false);
        setIsUpdatePostList((prev) => ({ ...prev, popularPage: false }));
        setCurrentScrollPos(0);
      }
      setPosts([]);
      setNextPostSnapShot({});
      setIsNextPostExist(false);
      getTenPopularPost(FIRSTSEARCH);
    }
    // else {
    //   setPosts(postsRecoil);
    //   setIsNextPostExist(isNextPostExistRecoil);
    //   recoverPost();
    //   setTimeout(
    //     () => window.scrollTo(currentScrollPos, currentScrollPos),
    //     100
    //   );
    //   setCurrentScrollPos(0);
    // }
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
                popularpost={true}
              ></SideOptionFormForPostBoard>
            </SideOptionContainer>
          )}
          <PostBoardBodyContainer>
            {isLoading ? (
              <InfoTextBox>잠시만 기다려 주세요</InfoTextBox>
            ) : posts.length !== 0 ? (
              posts.map((post) => (
                <PostElement key={post.id} post={post}></PostElement>
              ))
            ) : (
              <InfoTextBox>포스트가 존재하지 않습니다.</InfoTextBox>
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
              popularpost={true}
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

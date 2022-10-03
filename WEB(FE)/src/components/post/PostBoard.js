import { useState, useEffect } from "react";
import { dbService } from "../../lib/FStore";
import {
  query,
  collection,
  getDocs,
  limit,
  orderBy,
  startAfter,
} from "firebase/firestore";
import PostBoardTitleContainer from "./PostBoardTilteContainer";
import styled from "styled-components";
import PostBoardBodyContainer from "./PostBoardBodyContainer";
import PostElement from "./PostElement";
import SideOptionForm from "../common/SideOptionForm";
import MoreLoadPostButton from "./MoreLoadPostButton";
import { useRecoilState } from "recoil";
import {
  CountPost,
  CurrentScrollPos,
  IsLastPost,
  PostsList,
} from "../../store/PostStore";

const PostBoardContainerForDesktop = styled.div`
  height: fit-content;
  width: 720px;
`;

const PostBoardContainerForTablet = styled.div`
  height: fit-content;
  /*width: 60vw;*/
  flex-grow: 1;
`;

const PostBoardContainerForMobile = styled.div`
  height: fit-content;
  width: 100%;
`;

const SideOptionContainerForDesktop = styled.div`
  margin-left: 10px;
  height: fit-content;
  width: 230px;
  /*flex-grow: 1;*/
`;

const SideOptionContainerForTablet = styled.div`
  margin-left: 10px;
  height: fit-content;
  width: 230px;
  /*flex-grow: 1;*/
`;

const SideOptionContainerForMobile = styled.div`
  margin-top: 10px;
  height: fit-content;
  width: 100%;
  position: relative;
  /*flex-grow: 1;*/
`;

const PostBoard = ({ isDesktop, isSmallDesktop, isTablet }) => {
  const [worryPosts, setWorryPosts] = useState([]);
  const [earliestVisible, setEarliestVisible] = useState({});
  const [isNoNext, setIsNoNext] = useState(false);
  const [postsList, setPostsList] = useRecoilState(PostsList);
  const [countPost, setCountPost] = useRecoilState(CountPost);
  const [isLastPost, setIsLastPost] = useRecoilState(IsLastPost);
  const [currentScrollPos, setCurrentScrollPos] =
    useRecoilState(CurrentScrollPos);

  const snapshotToPosts = (snapshot) => {
    if (snapshot) {
      console.log(snapshot);
      snapshot.forEach((doc) => {
        const postObj = {
          ...doc.data(),
          id: doc.id,
        };
        setWorryPosts((prev) => [...prev, postObj]);
        setPostsList((prev) => [...prev, postObj]);
      });
    }
  };

  const getQueryWithDescendingTime = (limitDocs, startAfterPoint) => {
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
  };

  const getFirst = async () => {
    const first = getQueryWithDescendingTime(10);
    const firstSnapshot = await getDocs(first);
    console.log("point1");
    setEarliestVisible(firstSnapshot.docs[firstSnapshot.docs.length - 1]);
    console.log("point2");
    snapshotToPosts(firstSnapshot);
  };

  const moveNext = async () => {
    const next = getQueryWithDescendingTime(10, earliestVisible);
    const querySnapshot = await getDocs(next);
    console.log("point3");
    setEarliestVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
    const afterq = getQueryWithDescendingTime(
      1,
      querySnapshot.docs[querySnapshot.docs.length - 1]
    );
    const afterSnapshot = await getDocs(afterq);
    setCountPost((prev) => prev + 10);
    console.log("point4");
    if (afterSnapshot.docs.length === 0) {
      setIsNoNext(true);
      setIsLastPost(true);
    } else {
      setIsNoNext(false);
      setIsLastPost(false);
    }
    snapshotToPosts(querySnapshot);
  };

  const onClick = async (e) => {
    e.preventDefault();
    moveNext();
  };
  const recoverPost = async () => {
    const recoverQuery = query(
      collection(dbService, "WorryPost"),
      orderBy("created_timestamp", "desc"),
      limit(countPost)
    );
    const recoverSnapshot = await getDocs(recoverQuery);
    setEarliestVisible(recoverSnapshot.docs[recoverSnapshot.docs.length - 1]);
    const afterQuery = getQueryWithDescendingTime(
      1,
      recoverSnapshot.docs[recoverSnapshot.docs.length - 1]
    );
    const afterSnapshot = await getDocs(afterQuery);
    if (afterSnapshot.docs.length === 0) {
      setIsNoNext(true);
      setIsLastPost(true);
    } else {
      setIsNoNext(false);
      setIsLastPost(false);
    }
  };
  useEffect(() => {
    if (postsList.length === 0) {
      getFirst();
    } else {
      setWorryPosts(postsList);
      setIsNoNext(isLastPost);
      recoverPost();
      setTimeout(
        () => window.scrollTo(currentScrollPos, currentScrollPos),
        500
      );
    }
  }, []);

  if (worryPosts) {
    return (
      <>
        {isDesktop ? (
          <>
            <PostBoardContainerForDesktop>
              <PostBoardTitleContainer>고민 게시판</PostBoardTitleContainer>
              <PostBoardBodyContainer>
                {worryPosts.length !== 0 ? (
                  worryPosts.map((post) => (
                    <PostElement key={post.id} post={post}></PostElement>
                  ))
                ) : (
                  <div>잠시만 기다려 주세요</div>
                )}
              </PostBoardBodyContainer>
              {!isNoNext && (
                <MoreLoadPostButton
                  updatePostList={onClick}
                ></MoreLoadPostButton>
              )}
            </PostBoardContainerForDesktop>
            <SideOptionContainerForDesktop>
              <SideOptionForm></SideOptionForm>
            </SideOptionContainerForDesktop>
          </>
        ) : isTablet ? (
          <>
            <PostBoardContainerForTablet>
              <PostBoardTitleContainer>고민 게시판</PostBoardTitleContainer>
              <PostBoardBodyContainer>
                {worryPosts.length !== 0 ? (
                  worryPosts.map((post) => (
                    <PostElement key={post.id} post={post}></PostElement>
                  ))
                ) : (
                  <div>잠시만 기다려 주세요</div>
                )}
              </PostBoardBodyContainer>
              {!isNoNext && (
                <MoreLoadPostButton
                  updatePostList={onClick}
                ></MoreLoadPostButton>
              )}
            </PostBoardContainerForTablet>
            <SideOptionContainerForTablet>
              <SideOptionForm></SideOptionForm>
            </SideOptionContainerForTablet>
          </>
        ) : (
          <>
            <PostBoardContainerForMobile>
              <PostBoardTitleContainer>고민 게시판</PostBoardTitleContainer>
              <SideOptionContainerForMobile>
                <SideOptionForm></SideOptionForm>
              </SideOptionContainerForMobile>
              <PostBoardBodyContainer>
                {worryPosts.length !== 0 ? (
                  worryPosts.map((post) => (
                    <PostElement key={post.id} post={post}></PostElement>
                  ))
                ) : (
                  <div>잠시만 기다려 주세요</div>
                )}
              </PostBoardBodyContainer>
              {!isNoNext && (
                <MoreLoadPostButton
                  updatePostList={onClick}
                ></MoreLoadPostButton>
              )}
            </PostBoardContainerForMobile>
          </>
        )}
      </>
    );
  } else {
    return <></>;
  }
};

export default PostBoard;

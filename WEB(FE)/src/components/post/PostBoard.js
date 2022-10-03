import { useState, useEffect } from "react";
import { dbService } from "../../lib/FStore";
import { query, collection, getDocs, limit, orderBy, startAfter, endBefore } from "firebase/firestore";
import PostBoardTitleContainer from "./PostBoardTilteContainer";
import styled from "styled-components";
import PostBoardBodyContainer from "./PostBoardBodyContainer";
import PostElement from "./PostElement";

const PostBoardContainer = styled.div`
  height: fit-content;
  width: 60vw;
`;

const PostBoard = () => {
  const [worryPosts, setWorryPosts] = useState([]);
  const [earliestVisible, setEarliestVisible] = useState({});
  const [isNoNext, setIsNoNext] = useState(false);
  
  const snapshotToPosts = (snapshot) => {
    if (snapshot) {
      snapshot.forEach((doc) => {
        const postObj = {
          ...doc.data(),
          id: doc.id,
        };
        setWorryPosts((prev) => [...prev, postObj])
      });
    }
  }

  const getQueryWithDescendingTime = (limitDocs, startAfterPoint) => {
    if (startAfterPoint) {
      return (query(collection(dbService, "WorryPost"),
      orderBy("created_timestamp", "desc"),
      startAfter(startAfterPoint),
      limit(limitDocs)
      ))
    } else {
      return (query(collection(dbService, "WorryPost"),
      orderBy("created_timestamp", "desc"),
      limit(limitDocs)
      ))
    }  
  }
  
  const getFirst = async () => {
    const first = getQueryWithDescendingTime(10);
    const firstSnapshot = await getDocs(first);
    setEarliestVisible(firstSnapshot.docs[firstSnapshot.docs.length - 1]);
    snapshotToPosts(firstSnapshot);
  }

  const moveNext = async () => {
    const next = getQueryWithDescendingTime(10, earliestVisible)
    const querySnapshot = await getDocs(next)
    setEarliestVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
    const afterq = getQueryWithDescendingTime(1, querySnapshot.docs[querySnapshot.docs.length - 1])
    const afterSnapshot = await getDocs(afterq);
    (afterSnapshot.docs.length === 0 ? setIsNoNext(true) : setIsNoNext(false))
    snapshotToPosts(querySnapshot);
  }

  const onClick = async (e) => {
    e.preventDefault();
    const { name } = e.target
    if (name === "nextTen") {
      console.log("Showing Next Ten");
      moveNext();
    }
  }
  useEffect(() => {
    getFirst();
  }, []);
  if (worryPosts) {
    return (
      <>
        <PostBoardContainer>
          <PostBoardTitleContainer>고민 게시판</PostBoardTitleContainer>
          <PostBoardBodyContainer>
            {worryPosts.map((post) => (
              <PostElement key={post.id} post={post}></PostElement>
            ))}
          </PostBoardBodyContainer>
          {!isNoNext && <button name="nextTen" onClick={onClick}>다음 10개</button>}
        </PostBoardContainer>
      </>
    );
  } else {
    return <></>;
  }
};

export default PostBoard;

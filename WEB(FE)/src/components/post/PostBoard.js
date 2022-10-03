import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  //setFirstVisible => 페이지에서 가장 최신(latest) 포스트
  const [firstVisible, setFirstVisible] = useState({});
  // setLastVisible => 페이지에서 가장 오래된(earliest) 포스트
  const [lastVisible, setLastVisible] = useState({});
  const [isNoPrev, setIsNoPrev] = useState(true);
  const [isNoNext, setIsNoNext] = useState(false);
  const [earliestDoc, setEarliestDoc] = useState({});
  const [latestDoc, setLatestDoc] = useState({});
  
  const snapshotToPosts = (snapshot, reverse=false) => {
    if (snapshot) {
      // 무한스크롤 할 시 주석처리 setWorryPosts([]);
      snapshot.forEach((doc) => {
        const postObj = {
          ...doc.data(),
          id: doc.id,
        };
        if (!reverse) {
          setWorryPosts((prev) => [...prev, postObj]);
        } else {
          setWorryPosts((prev) => [postObj, ...prev]);
        }
        // console.log(doc.id, " => " , doc.data())
      });
    }
  }
  
  const getFirst = async () => {
    const first = query(collection(dbService, "WorryPost"),
      orderBy("created_timestamp", "desc"),
      limit(10)
    )
    const firstSnapshot = await getDocs(first);
    setLastVisible(firstSnapshot.docs[firstSnapshot.docs.length - 1]);
    setFirstVisible(firstSnapshot.docs[0]);
    snapshotToPosts(firstSnapshot);
  }

  const getDocsLatestOrEarliest = async (isLatest) => {
    if (isLatest) {
      const q = query(collection(dbService, "WorryPost"), 
        orderBy("created_timestamp", "desc"), 
        limit(1)
      );
      const querySnapshot = await getDocs(q);
      setTimeout(() => {
        //console.log(querySnapshot.docs[0]);
      }, 2000)
      setLatestDoc(querySnapshot.docs[0])
    } else {
      const q = query(collection(dbService, "WorryPost"), 
        orderBy("created_timestamp", "asc"), 
        limit(1)
      );
      const querySnapshot = await getDocs(q);
      setTimeout(() => {
        //console.log(querySnapshot.docs[0]);
      }, 2000)
      setEarliestDoc(querySnapshot.docs[0])
    }
    
  }

  const moveNext = async () => {
    const next = query(collection(dbService, "WorryPost"), 
      orderBy("created_timestamp", "desc"), 
      startAfter(lastVisible), 
      limit(10)
    );
    const querySnapshot = await getDocs(next)
    
    console.log("earliest visible before: ", lastVisible);
    console.log("latest visible before: ", firstVisible);
    
    setTimeout(() => {
      console.log("this should be earliest visible after :", querySnapshot.docs[querySnapshot.docs.length - 1])
    }, 2000)
    setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
    setFirstVisible(querySnapshot.docs[0]);
    // 만약에 lastVisible 뒤에 문서가 없으면 setIsNoNext(true)
  
    console.log("earliest visible after: ", lastVisible);
    console.log("latest visible after: ", firstVisible);
    console.log("earliest entirely: ", earliestDoc);
    console.log("latest entirely: ", latestDoc);
    
    if (lastVisible === earliestDoc) {
      setIsNoNext(true)
    } else { 
      setIsNoNext(false) 
    }
    const afterq = query(collection(dbService, "WorryPost"), 
    orderBy("created_timestamp", "desc"), 
    startAfter(querySnapshot.docs[querySnapshot.docs.length - 1]), 
    limit(1)
    ); 
    const afterSnapshot = await getDocs(afterq);
    console.log("afterq: ", afterq)
    console.log("snapshot: ", afterSnapshot)
    if (afterSnapshot.docs.length === 0) {
      console.log("No More Posts!")
    } else {
      console.log("THERE ARE MORE POSTS")
    }
    snapshotToPosts(querySnapshot);
  }

  const movePrev = async () => {
    const next = query(collection(dbService, "WorryPost"), 
      orderBy("created_timestamp", "asc"), 
      startAfter(firstVisible), 
      limit(10)
    );
    const querySnapshot = await getDocs(next)
    setTimeout(() => {
      console.log("earliest visible before: ", lastVisible);
      console.log("latest visible before: ", firstVisible);
    }, 2000)
    setLastVisible(querySnapshot.docs[0]);
    setFirstVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
    // 만약에 firstVisible 앞에 문서가 없으면 setIsNoPrev(true)
    setTimeout(() => {
      console.log("earliest visible after: ", lastVisible);
      console.log("latest visible after: ", firstVisible);
      console.log("earliest entirely: ", earliestDoc);
      console.log("latest entirely: ", latestDoc);
    }, 2000)
    if (firstVisible === latestDoc) {
      setIsNoPrev(true)
    } else { 
      setIsNoPrev(false) 
    }
    // 아니면 setIsNoPrev(false)
    snapshotToPosts(querySnapshot, true);
  }

  const onClick = async (e) => {
    e.preventDefault();
    const { name } = e.target
    if (name === "prevTen") {
      console.log("Showing prev ten");
      movePrev();
    } else if (name === "nextTen") {
      console.log("Showing Next Ten");
      moveNext();
    }
  }

  /*const getPosts = async () => {
    const q = await query(
      collection(dbService, "WorryPost"),
      limit(10),
      orderBy("created_timestamp", "desc")
    );
    
    setTimeout(() => { console.log(lastVisible, "\n and \n", firstVisible) }, 2000);

    
    const querySnapShot = await getDocs(q);
    if (querySnapShot) {
      querySnapShot.forEach((doc) => {
        const postObj = {
          ...doc.data(),
          id: doc.id,
        };
        setWorryPosts((prev) => [...prev, postObj]);
        // console.log(doc.id, " => " , doc.data())
      });
    }
  };*/
  useEffect(() => {
    getDocsLatestOrEarliest(true);
    getDocsLatestOrEarliest(false);
    getFirst();
  }, []);
  useEffect(() => {
    console.log(firstVisible);
  }, [firstVisible]);
  console.log(worryPosts);
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
          <button name="prevTen" onClick={onClick}>이전 10개</button>
          <button name="nextTen" onClick={onClick}>다음 10개</button>
        </PostBoardContainer>
      </>
    );
  } else {
    return <></>;
  }
};

export default PostBoard;

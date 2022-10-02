import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { dbService } from "../../lib/FStore";
import { query, collection, getDocs, limit, orderBy } from "firebase/firestore";
import PostBoardTitleContainer from "./PostBoardTilteContainer";
import styled from "styled-components";
import PostBoardBodyContainer from "./PostBoardBodyContainer";
import PostElement from "./PostElement";
import SideOptionForm from "../common/SideOptionForm";

const PostBoardContainer = styled.div`
  height: fit-content;
  width: 60vw;
`;

const SideOptionContainer = styled.div`
  margin-left: 10px;
  height: fit-content;
  flex-grow: 1;
`;

const PostBoard = () => {
  const [worryPosts, setWorryPosts] = useState([]);
  const getPosts = async () => {
    const q = await query(
      collection(dbService, "WorryPost"),
      limit(10),
      orderBy("created_timestamp", "desc")
    );
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
  };
  useEffect(() => {
    getPosts();
  }, []);
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
        </PostBoardContainer>
        <SideOptionContainer>
          <SideOptionForm></SideOptionForm>
        </SideOptionContainer>
      </>
    );
  } else {
    return <></>;
  }
};

export default PostBoard;

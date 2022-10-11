import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import PopularPostBoard from "../components/post/PopularPostBoard";
import PostBoard from "../components/post/PostBoard";
import media from "../modules/MediaQuery";

export const BoardContainer = styled.div`
  margin: 0px auto;
  width: 960px;
  display: flex;
  flex-direction: row;
  ${media.smallDesktop`
    margin: inherit;
    width: inherit;
    padding: 0px 10vw;
  `}
  ${media.mobile`
    padding: 0px 5vw;
  `}
`;

const BoardPage = () => {
  const location = useLocation();
  const [kindOfBoard, setKindOfBoard] = useState("");
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("sort");

    if (id === "latest") {
      setKindOfBoard("latest");
    } else if (id === "like_count") {
      setKindOfBoard("like_count");
    } else {
      // 잘못된 페이지
    }
  }, []);
  return (
    <BoardContainer>
      {kindOfBoard === "latest" && <PostBoard></PostBoard>}
      {kindOfBoard === "like_count" && <PopularPostBoard></PopularPostBoard>}
    </BoardContainer>
  );
};

export default BoardPage;

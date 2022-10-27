import { Helmet } from "react-helmet-async";
import PostContentContainer from "../components/postContent/PostContentContainer";

const PostPage = ({ isAdmin }) => {
  return (
    <>
      <Helmet>
        <title>포스트 - Whisper Soldier</title>
      </Helmet>
      <PostContentContainer isAdmin={isAdmin}></PostContentContainer>
    </>
  );
};

export default PostPage;

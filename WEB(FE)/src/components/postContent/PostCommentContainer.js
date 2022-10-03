import styled from "styled-components";
import { useEffect, useState } from "react";
import { dbService } from "../../lib/FStore";
import { 
  collection, 
  getDocs, 
  orderBy, 
  query, 
  where
  } from "firebase/firestore";

const PostCommentBox = styled.div`
  margin: 10px 0px 0px 10px;
  padding: 10px 20px;
  height: fit-content;
  width: 45vw;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
`;

const PostCommentElement = styled.div`
  white-space : pre-wrap;

`;

const PostCommentContainer = ({
  postInfo
}) => {
  const [postComments, setPostComments] = useState([]);
  const getPostComments = async () => {
    const postCommentQuery = query(collection(dbService, "Comment"),
      where("associated_post_id", "==", postInfo.id),
      orderBy("created_timestamp")
    )
    const querySnapshot = await getDocs(postCommentQuery);
    querySnapshot.forEach((comment) => {
      const postCommentObj = {
        ...comment.data(),
        id: comment.id,
      }
      setPostComments(prev => [...prev, postCommentObj])
    })
    console.log("comments :", querySnapshot.docs);
  };
  useEffect(() => {
    getPostComments();
  }, []);
  
  return (
    <PostCommentBox>
      <div>
        {postComments.map(comment => 
          <PostCommentElement key={comment.id}>
            {comment.comment_text}
          </PostCommentElement>
        )}
      </div>
    </PostCommentBox>
  );
};

export default PostCommentContainer;
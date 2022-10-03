import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// 추후에 편집, 삭제 구현 시 authService.currentUser.uid === contentObj.creator_id 비교 목적
import { authService } from "../lib/FAuth";
import { dbService } from "../lib/FStore";
import { 
  doc, 
  updateDoc, 
  deleteDoc, 
  addDoc, 
  collection, 
  serverTimestamp,
  getDocs, 
  orderBy, 
  query, 
  where,
  startAfter
} from "firebase/firestore";
import { useRecoilState } from "recoil";
import { PostInfo } from "../store/PostStore";
import { useAndSetForm } from "../modules/useForm.js";

import PostContentContainer from "../components/postContent/PostContentContainer";

const PostPage = () => {
  const [postInfo, setPostInfo] = useRecoilState(PostInfo);
  // console.log(postInfo); 전역 상태 관리 테스트
  const [state, setState, onChange] = useAndSetForm({
    editContent: postInfo.postContent,
    comment: "",
  });

  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [latestVisibleComment, setLatestVisibleComment] = useState({});
  
  const [postComments, setPostComments] = useState([]);
  const getPostCommentQuery = (isAdd) => {
    if (!isAdd) {
      return(query(collection(dbService, "Comment"),
      where("associated_post_id", "==", postInfo.id),
      orderBy("created_timestamp", "desc")
    ))} else {
      return(query(collection(dbService, "Comment"),
      where("associated_post_id", "==", postInfo.id),
      orderBy("created_timestamp", "asc"),
      startAfter(latestVisibleComment)
    ))
    }
  }
  const getPostComments = async (isAdd=false) => {
    const querySnapshot = await getDocs(getPostCommentQuery(isAdd));
    setLatestVisibleComment(querySnapshot.docs.length === 0 ? null : querySnapshot.docs[0])
    
    querySnapshot.forEach((comment) => {
      const postCommentObj = {
        ...comment.data(),
        id: comment.id,
      }
      if (isAdd) {
        setPostComments(prev => [...prev, postCommentObj])
      } else {
        setPostComments(prev => [postCommentObj, ...prev])
      }
      
    })

    console.log("comments :", querySnapshot.docs);
  };


  const onDeleteClick = async (e) => {
    const {
      target: { name },
    } = e;
    const check = window.confirm("정말로 삭제 하시겠습니까?");
    if (check) {
      console.log(`deleting ${postInfo.id}`);
      await deleteDoc(doc(dbService, "WorryPost", postInfo.id)).then(
        alert("삭제 되었습니다.")
      );
      navigate("/");
    }
  };

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  const onClick = async (e) => {
    const {
      target: { name },
    } = e;
    e.preventDefault();
    const check = window.confirm("정말로 수정하시겠습니까?");
    if (check) {
      await updateDoc(doc(dbService, "WorryPost", postInfo.id), {
        text: state.editContent,
      })
        .then(
          setPostInfo((prev) => ({ ...prev, postContent: state.editContent }))
        )
        .then(alert("수정되었습니다."))
        .then(setEditing(false));
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const {
      target: { name },
    } = e;
    if (name === "submitComment") {
      try {
        const docRef = await addDoc(collection(dbService, "Comment"), {
          commentor_id: authService.currentUser.uid,
          associated_post_id: postInfo.id,
          comment_text: state.comment,
          comment_report: false,
          comment_rep_accept: false,
          like_count: 0,
          created_timestamp: serverTimestamp(),
        })
        console.log("Comment written with ID:", docRef.id);
        alert("댓글이 정상적으로 업로드되었습니다.");
        setState((prev) => ({ ...prev, comment: "" }));
        //setPostComments([]);
        getPostComments(true);
      } catch (error) {
        console.log("Error adding comment: ", error);
      }
    }
  };

  return (
    <PostContentContainer
      postInfo={postInfo}
      state={state}
      onChange={onChange}
      editing={editing}
      postComments={postComments}
      onSubmit={onSubmit}
      onClick={onClick}
      onDeleteClick={onDeleteClick}
      toggleEditing={toggleEditing}
      getPostComments={getPostComments}
    ></PostContentContainer>
  );
};

export default PostPage;

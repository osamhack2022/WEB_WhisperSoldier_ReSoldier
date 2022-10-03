import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// 추후에 편집, 삭제 구현 시 authService.currentUser.uid === contentObj.creator_id 비교 목적
import { authService } from "../lib/FAuth";
import { dbService } from "../lib/FStore";
import { doc, getDoc, updateDoc, deleteDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRecoilState } from "recoil";
import { PostInfo } from "../store/PostStore";
import useForm, { useAndSetForm } from "../modules/useForm.js";

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

  const onDeleteClick = async (e) => {
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
    console.log("event :", e)
    const {
      target: { name },
    } = e;
    console.log("NAME: ", name);
    if (true) {
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
      onSubmit={onSubmit}
      onClick={onClick}
      onDeleteClick={onDeleteClick}
      toggleEditing={toggleEditing}
    ></PostContentContainer>
  );
};

export default PostPage;

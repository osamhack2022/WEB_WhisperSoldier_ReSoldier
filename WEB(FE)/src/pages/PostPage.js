import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// 추후에 편집, 삭제 구현 시 authService.currentUser.uid === contentObj.creator_id 비교 목적
import { authService } from "../lib/FAuth";
import { dbService } from "../lib/FStore";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useRecoilState } from "recoil";
import { PostInfo } from "../store/PostStore";
import {useAndSetForm} from "../modules/useForm.js";
import PostContentContainer from "../components/postContent/PostContentContainer";

const PostPage = () => {
  const [postInfo, setPostInfo] = useRecoilState(PostInfo);
  // console.log(postInfo); 전역 상태 관리 테스트
  const [state, setState, onChange] = useAndSetForm({
    editContent: postInfo.postContent,
    comment: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const [editing, setEditing] = useState(false);
  const [errorPostInfo, setErrorPostInfo] = useState(false);

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
    // 추후 댓글 구현 예정
    const {
      target: { name },
    } = e;
    console.log();
    if (name === "submitComment") {
      // 댓글 전송하기
    }
  };

  const getContent = async () => {
    const docRef = doc(dbService, "WorryPost", id);
    const docSnapShot = await getDoc(docRef);
    if (docSnapShot.exists()) {
      console.log("Doc Data: ", docSnapShot.data().created_timestamp);
      const contentObj = {
        ...docSnapShot.data(),
        id,
      };
      setPostInfo((prev) => ({
        ...prev,
        creator_id: contentObj.creator_id,
        created_timestamp: contentObj.created_timestamp
          .toDate()
          .toLocaleString(),
        id: contentObj.id,
        postContent: contentObj.text,
      }));
      setState((prev)=>({
        ...prev,
        editContent: contentObj.text
    }));
    } else {
      setErrorPostInfo(true);
      console.log("No such Document!");
    }
  };

  useEffect(() => {
    console.log("[PostPage.js]");
    console.log(postInfo);
    if (postInfo.created_timestamp === null) { // 상태 관리 객체가 비어 있을 때를 TimeStamp 값 유무로 관리한다.
      getContent();
    }
    console.log("[PostPage.js]");
    console.log(postInfo);
  }, []);

  return (
    <PostContentContainer
      postInfo={postInfo}
      state={state}
      onChange={onChange}
      editing={editing}
      errorPostInfo ={errorPostInfo}
      onSubmit={onSubmit}
      onClick={onClick}
      onDeleteClick={onDeleteClick}
      toggleEditing={toggleEditing}
    ></PostContentContainer>
  );
};

export default PostPage;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// 추후에 편집, 삭제 구현 시 authService.currentUser.uid === contentObj.creator_id 비교 목적
import { authService } from "../lib/FAuth";
import { dbService } from "../lib/FStore";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useRecoilState } from "recoil";
import { PostInfo } from "../store/PostStore";
import useForm from "../modules/useForm.js";
import PostContentContainer from "../components/postContent/PostContentContainer";

const PostPage = () => {
  const [postInfo, setPostInfo] = useRecoilState(PostInfo);
  // console.log(postInfo); 전역 상태 관리 테스트
  const [state, onChange] = useForm({
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
      //setContent(contentObj);
      setPostInfo((prev) => ({
        ...prev,
        creator_id: contentObj.creator_id,
        created_timestamp: contentObj.created_timestamp
          .toDate()
          .toLocaleString(),
        id: contentObj.id,
        postContent: contentObj.text,
      }));
      // conetneObj의 timestamp를 Date로 바꾼 뒤 한국 날짜 형식으로 바꿔준다.
      // timestamp가 state에 올라간 뒤로부터는 더 이상 timestamp로 인식되지 않는다.
      // 따라서 state에 올라가기 전에 미리 우리가 원하는 문자열로 변환해준 뒤 올렸다.
      // 아마 댓글의 시각 표시도 이런 식으로 진행해야 할 것이다.
      //const postTime = contentObj.created_timestamp.toDate().toLocaleString();
      /*setPostTimeStr(
            String((test.getMonth() + 1) + "월 "
            + test.getDate() + "일 " 
            + ("0" + test.getHours()).slice(-2) + ":" + ("0" + test.getMinutes()).slice(-2))
        )*/
    } else {
      setErrorPostInfo(true);
      console.log("No such Document!");
    }
  };

  useEffect(() => {
    console.log("[PostPage.js]");
    console.log(postInfo);
    if (postInfo.created_timestamp === null) {
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
      onSubmit={onSubmit}
      onClick={onClick}
      onDeleteClick={onDeleteClick}
      toggleEditing={toggleEditing}
    ></PostContentContainer>
  );
};

export default PostPage;

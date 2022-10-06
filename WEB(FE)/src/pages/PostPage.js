import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dbService } from "../lib/FStore";
import { dbFunction } from "../lib/FStore";
import { useRecoilState, useSetRecoilState } from "recoil";
import { IsUpdatePostList, PostInfo } from "../store/PostStore";
import { useAndSetForm } from "../modules/useForm.js";
import PostContentContainer from "../components/postContent/PostContentContainer";

const PostPage = ({ isDesktop, isTablet }) => {
  const {
    doc,
    updateDoc,
    deleteDoc,
    collection,
    getDocs,
    getDoc,
    orderBy,
    query,
    where,
  } = dbFunction;

  const [postInfo, setPostInfo] = useRecoilState(PostInfo);
  const setIsUpdatePostList = useSetRecoilState(IsUpdatePostList);

  const [state, setState, onChange] = useAndSetForm({
    editContent: postInfo.postContent,
    comment: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const [editing, setEditing] = useState(false);
  const [errorPostInfo, setErrorPostInfo] = useState(false);
  const [errorEditInfo, setErrorEditInfo] = useState(false);

  const onDeleteClick = async (e) => {
    const check = window.confirm("정말로 글을 삭제하시겠습니까?");
    if (check) {
      console.log(`deleting ${postInfo.id}`);
      await deleteDoc(doc(dbService, "WorryPost", postInfo.id)).then(
        alert("글이 삭제되었습니다.")
      );

      /*삭제된 post 내 속한 댓글 삭제 */
      const querySnapshot = await getDocs(
        query(
          collection(dbService, "Comment"),
          where("associated_post_id", "==", postInfo.id),
          orderBy("created_timestamp", "desc")
        )
      );
      querySnapshot.forEach((comment) => {
        deleteDoc(doc(dbService, "Comment", comment.id));
      });
      navigate("/");
    }
  };

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  const onClick = async (e) => {
    e.preventDefault();
    if (state.editContent.length === 0) {
      setErrorEditInfo(true);
      setTimeout(() => {
        setErrorEditInfo(false);
      }, 3000);
    } else {
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
        setIsUpdatePostList(true);
      }
    }
  };

  /*새로고침시 전역 상태 정보가 날라가는 현상으로 인한 오류 발생을 막기 위한 함수*/
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
      setState((prev) => ({
        ...prev,
        editContent: contentObj.text,
      }));
    } else {
      setErrorPostInfo(true);
      console.log("No such Document!");
    }
  };

  useEffect(() => {
    if (postInfo.created_timestamp === null) {
      getContent();
    }
  }, []);

  return (
    <PostContentContainer
      postInfo={postInfo}
      state={state}
      onChange={onChange}
      editing={editing}
      setState={setState}
      errorPostInfo={errorPostInfo}
      errorEditInfo={errorEditInfo}
      onClick={onClick}
      onDeleteClick={onDeleteClick}
      toggleEditing={toggleEditing}
      isDesktop={isDesktop}
      isTablet={isTablet}
    ></PostContentContainer>
  );
};

/**
 *       postComments={postComments}
      commentList={commentList}
      getPostComments={getPostComments}
            onSubmit={onSubmit}
 */

export default PostPage;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dbService } from "../lib/FStore";
import { dbFunction } from "../lib/FStore";
import { useRecoilState, useSetRecoilState } from "recoil";
import { IsUpdatePostList, PostInfo } from "../store/PostStore";
import { useAndSetForm } from "../modules/useForm.js";
import PostContentContainer from "../components/postContent/PostContentContainer";
import { whisperSodlierSessionKey } from "../lib/Const";

const PostPage = () => {
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

  const { id } = useParams();
  const [editing, setEditing] = useState(false);
  const [errorPostInfo, setErrorPostInfo] = useState(false);
  const [errorEditInfo, setErrorEditInfo] = useState(false);

  const [isLikedByMe, setIsLikedByMe] = useState(false);

  const [postUserNickname, setPostUserNickname] = useState("");
  const [postUserProfileImg, setPostUserProfileImg] = useState("");

  const getIsLiked = async (currentPostInfo = null) => {
    const { uid: currentUserUid } = JSON.parse(
      sessionStorage.getItem(whisperSodlierSessionKey)
    );

    if (!currentPostInfo) {
      currentPostInfo = postInfo.id;
    }

    console.log(currentUserUid);
    console.log(postInfo);
    const likeCheckQuery = query(
      collection(dbService, "PostLike"),
      where("associated_post_id", "==", currentPostInfo),
      where("user_id", "==", currentUserUid)
    );

    const querySnapshot = await getDocs(likeCheckQuery);
    console.log(querySnapshot);
    if (querySnapshot.docs.length === 0) {
      setIsLikedByMe(false);
    } else {
      setIsLikedByMe(true);
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
        setIsUpdatePostList((prev) => ({
          ...prev,
          searchPage: true,
          newestPage: true,
          popularPage: true,
        }));
      }
    }
  };

  const getPostUserNickname = async (refreshData = null) => {
    let userDoc;
    if (refreshData) {
      userDoc = await getDoc(doc(dbService, "User", refreshData.creator_id));
    } else {
      userDoc = await getDoc(doc(dbService, "User", postInfo.creator_id));
    }

    if (userDoc.data()) {
      setPostUserNickname(userDoc.data().nickname);
      setPostUserProfileImg(userDoc.data().profileImg);
    }
  };

  /*새로고침시 전역 상태 정보가 날라가는 현상으로 인한 오류 발생을 막기 위한 함수*/
  const getContent = async () => {
    const docRef = doc(dbService, "WorryPost", id);
    const docSnapShot = await getDoc(docRef);
    if (docSnapShot.exists()) {
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
        like_count: contentObj.like_count,
        postContent: contentObj.text,
        comment_count: contentObj.comment_count,
      }));
      setState((prev) => ({
        ...prev,
        editContent: contentObj.text,
      }));
      getIsLiked(contentObj.id);
      getPostUserNickname(contentObj);
    } else {
      setErrorPostInfo(true);
      console.log("No such Document!");
    }
  };

  useEffect(() => {
    if (postInfo.created_timestamp === null) {
      getContent();
    } else {
      getIsLiked();
      getPostUserNickname();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <PostContentContainer
      postInfo={postInfo}
      setPostInfo={setPostInfo}
      state={state}
      onChange={onChange}
      editing={editing}
      setState={setState}
      errorPostInfo={errorPostInfo}
      errorEditInfo={errorEditInfo}
      onClick={onClick}
      toggleEditing={toggleEditing}
      isLikedByMe={isLikedByMe}
      setIsLikedByMe={setIsLikedByMe}
      postUserNickname={postUserNickname}
      postUserProfileImg={postUserProfileImg}
    ></PostContentContainer>
  );
};

export default PostPage;

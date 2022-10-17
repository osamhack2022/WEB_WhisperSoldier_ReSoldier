import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dbService, storageFunction, storageService } from "../lib/FStore";
import { dbFunction } from "../lib/FStore";
import { useRecoilState, useSetRecoilState } from "recoil";
import { IsUpdatePostList, PostInfo } from "../store/PostStore";
import { useAndSetForm } from "../modules/useForm.js";
import PostContentContainer from "../components/postContent/PostContentContainer";
import { addDoc, increment, serverTimestamp } from "firebase/firestore";
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
  const { ref, uploadString, getDownloadURL, deleteObject } = storageFunction;

  const [postInfo, setPostInfo] = useRecoilState(PostInfo);
  const setIsUpdatePostList = useSetRecoilState(IsUpdatePostList);

  const [state, setState, onChange] = useAndSetForm({
    editContent: postInfo.postContent,
    comment: "",
    editTag: postInfo.tag_name,
  });

  const navigate = useNavigate();
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

  const onDeleteClick = async (e) => {
    const check = window.confirm("정말로 글을 삭제하시겠습니까?");
    if (check) {
      console.log(`deleting ${postInfo.id}`);
      await deleteDoc(doc(dbService, "WorryPost", postInfo.id)).then(
        alert("글이 삭제되었습니다.")
      );
      const oldtagSnap = await getDocs(query(collection(dbService, "Tag"), 
            where("tag_name", "==", postInfo.tag_name),
          ));
      if (oldtagSnap.docs.length === 0) {
        console.log("Could not find Old Tag");
      } else {
        updateDoc(doc(dbService, "Tag", oldtagSnap.docs[0].id), {
          "tag_count": increment(-1),
        });
        console.log("Old Tag count incremented by -1 as the tag EXISTS in collection")
      }

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

      /* 삭제된 post의 공감 삭제 */
      const queryLikeSnapshot = await getDocs(
        query(
          collection(dbService, "PostLike"),
          where("associated_post_id", "==", postInfo.id),
          orderBy("created_timestamp", "desc")
        )
      );
      queryLikeSnapshot.forEach((like) => {
        deleteDoc(doc(dbService, "PostLike", like.id));
      });

      const queryCommentLikeSnapshot = await getDocs(
        query(
          collection(dbService, "CommentLike"),
          where("associated_comment_id", "==", postInfo.id),
          orderBy("created_timestamp", "desc")
        )
      );
      queryCommentLikeSnapshot.forEach((like) => {
        deleteDoc(doc(dbService, "CommentLike", like.id));
      });

      setIsUpdatePostList((prev) => ({
        ...prev,
        searchPage: true,
        newestPage: true,
        popularPage: true,
      }));
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
          tag_name: state.editTag,
        })
          .then(
            setPostInfo((prev) => ({ ...prev, postContent: state.editContent, tag_name: state.editTag }))
          )
          .then(alert("수정되었습니다."))
          .then(setEditing(false));
        
        // 태그가 없을 경우에는 따로 Tag 컬렉션에 추가하지 않는다.
          const oldtagSnap = await getDocs(query(collection(dbService, "Tag"), 
            where("tag_name", "==", postInfo.tag_name),
          ));
          if (oldtagSnap.docs.length === 0) {
            console.log("Could not find Old Tag");
          } else {
            updateDoc(doc(dbService, "Tag", oldtagSnap.docs[0].id), {
              "tag_count": increment(-1),
            });
            console.log("Old Tag count incremented by -1 as the tag EXISTS in collection")
          }
        if (state.editTag !== "") {
          const newTagSnap = await getDocs(query(collection(dbService, "Tag"),
            where("tag_name", "==", state.editTag)
          ));
          if (newTagSnap.docs.length === 0) {
            const tagDocRef = await addDoc(collection(dbService, "Tag"), {
              tag_count: 1,
              tag_name: state.editTag,
            });
            console.log("Tag added to collection with ID: ", tagDocRef.id);
          } else {
            updateDoc(doc(dbService, "Tag", newTagSnap.docs[0].id), {
              "tag_count": increment(1),
            });
            console.log("Tag count incremented by 1 as the tag EXISTS in collection")
          }
        }
        setIsUpdatePostList((prev) => ({
          ...prev,
          searchPage: true,
          newestPage: true,
          popularPage: true,
        }));
      }
    }
  };

  const toggleLike = async () => {
    const { uid: currentUserUid } = JSON.parse(
      sessionStorage.getItem(whisperSodlierSessionKey)
    );
    const postDocRef = doc(dbService, "WorryPost", postInfo.id);
    console.log(postDocRef);
    if (isLikedByMe) {
      const likeCheckQuery = query(
        collection(dbService, "PostLike"),
        where("associated_post_id", "==", postInfo.id),
        where("user_id", "==", currentUserUid)
      );
      const querySnapshot = await getDocs(likeCheckQuery);
      if (querySnapshot.docs.length === 0) {
        console.log("you have not liked this yet.");
      } else {
        querySnapshot.forEach((like) => {
          deleteDoc(doc(dbService, "PostLike", like.id));
        });
      }
      await updateDoc(postDocRef, {
        like_count: postInfo.like_count - 1,
      }).then(
        setPostInfo((prev) => ({
          ...prev,
          like_count: postInfo.like_count - 1,
        }))
      );
      setIsLikedByMe(false);
      console.log("Subtracted");
    } else {
      await updateDoc(postDocRef, {
        like_count: postInfo.like_count + 1,
      }).then(
        setPostInfo((prev) => ({
          ...prev,
          like_count: postInfo.like_count + 1,
        }))
      );
      await addDoc(collection(dbService, "PostLike"), {
        associated_post_id: postInfo.id,
        user_id: currentUserUid,
        created_timestamp: serverTimestamp(),
      }).then(setIsLikedByMe(true));
      console.log("Added");
      console.log(postInfo.id);
    }
    setIsUpdatePostList((prev) => ({
      ...prev,
      searchPage: true,
      newestPage: true,
      popularPage: true,
    }));
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
        tag_name: contentObj.tag_name,
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
      state={state}
      onChange={onChange}
      editing={editing}
      setState={setState}
      errorPostInfo={errorPostInfo}
      errorEditInfo={errorEditInfo}
      onClick={onClick}
      onDeleteClick={onDeleteClick}
      toggleEditing={toggleEditing}
      toggleLike={toggleLike}
      isLikedByMe={isLikedByMe}
      postUserNickname={postUserNickname}
      postUserProfileImg={postUserProfileImg}
    ></PostContentContainer>
  );
};

export default PostPage;

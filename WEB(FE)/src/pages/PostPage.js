import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// 추후에 편집, 삭제 구현 시 authService.currentUser.uid === contentObj.creator_id 비교 목적
import { authService } from "../lib/FAuth";
import { dbService } from "../lib/FStore";
/*import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";*/
import { dbFunction } from "../lib/FStore";
import { useRecoilState } from "recoil";
import { PostInfo } from "../store/PostStore";
import { useAndSetForm } from "../modules/useForm.js";
import PostContentContainer from "../components/postContent/PostContentContainer";
import { CommentList } from "../store/Comment";
import { TimeStampToStr } from "../modules/TimeStampToStr";

const PostPage = ({ isDesktop, isTablet}) => {
  const {doc, 
  updateDoc, 
  deleteDoc, 
  addDoc, 
  collection, 
  serverTimestamp,
  getDocs, 
  getDoc,
  orderBy, 
  query, 
  where,
  startAfter} = dbFunction;

  const [postInfo, setPostInfo] = useRecoilState(PostInfo);
  const [commentList, setCommentList] = useRecoilState(CommentList);

  const [state, setState, onChange] = useAndSetForm({
    editContent: postInfo.postContent,
    comment: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const [editing, setEditing] = useState(false);
  const [errorPostInfo, setErrorPostInfo] = useState(false);

  const [latestVisibleComment, setLatestVisibleComment] = useState({});
  const [postComments, setPostComments] = useState([]);
  const getPostCommentQuery = (isAddingComments) => {
    if (!isAddingComments) {
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
  const getPostComments = async (isAddingComments=false, isDeletingOrEditing=false) => {
    const querySnapshot = await getDocs(getPostCommentQuery(isAddingComments));
    setLatestVisibleComment(querySnapshot.docs.length === 0 ? null : querySnapshot.docs[0])
    if (isDeletingOrEditing) {
      setPostComments([]);
    }
  
    querySnapshot.forEach((comment) => {
      //console.log("[PostPage.js - comment.data()]",comment.data());
      //console.log("[PostPage.js - comment]",comment);
      const postCommentObj = {
        ...comment.data(),
        id: comment.id,
        created_timestamp : TimeStampToStr(comment.data().created_timestamp)
      }
      
      if (isAddingComments) {
        setPostComments(prev => [...prev, postCommentObj]);
        setCommentList(prev => [...prev, postCommentObj]);
      } else {
        setPostComments(prev => [postCommentObj, ...prev]);
        setCommentList(prev => [...prev, postCommentObj]);
      }
      
    })
    console.log("comments :", querySnapshot.docs);

  };


  const onDeleteClick = async (e) => {
    const check = window.confirm("정말로 글을 삭제하시겠습니까?");
    if (check) {
      console.log(`deleting ${postInfo.id}`);
      await deleteDoc(doc(dbService, "WorryPost", postInfo.id)).then(
        alert("글이 삭제되었습니다.")
      );
      const querySnapshot = await getDocs(getPostCommentQuery());
      querySnapshot.forEach((comment) => {
        deleteDoc(doc(dbService, "Comment", comment.id))
      })
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
    const {
      target: { name },
    } = e;
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
    console.log("[PostPage.js]");
    console.log(postInfo);
    if (postInfo.created_timestamp === null) {
      // 상태 관리 객체가 비어 있을 때를 TimeStamp 값 유무로 관리한다.
      getContent();
    }
    console.log("[PostPage.js]");
    //getPostComments();
    console.log(postInfo);
  }, []);

  return (
    <PostContentContainer
      postInfo={postInfo}
      state={state}
      onChange={onChange}
      editing={editing}
      postComments={postComments}
      commentList={commentList}
      getPostComments={getPostComments}
      errorPostInfo={errorPostInfo}
      onSubmit={onSubmit}
      onClick={onClick}
      onDeleteClick={onDeleteClick}
      toggleEditing={toggleEditing}
      isDesktop={isDesktop} isTablet={isTablet}
    ></PostContentContainer>
  );
};

export default PostPage;

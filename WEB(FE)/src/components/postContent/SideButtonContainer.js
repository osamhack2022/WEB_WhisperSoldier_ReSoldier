import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { whisperSodlierSessionKey } from "../../lib/Const";
import { dbFunction, dbService } from "../../lib/FStore";
import {
  DeletePostButton,
  EditPostButton,
  LikeButton,
  PostChatButton,
  ReportButton,
} from "../common/Buttons";
import { useSetRecoilState } from "recoil";
import { IsUpdatePostList } from "../../store/PostStore";
import { StartFirstChat } from "../../store/ChatStore";
import { WsDialogTitle } from "../../styles/profile/CheckDefaultProfileImgDialogStyle";
import { Dialog, DialogActions } from "@mui/material";
import {
  CancelButton,
  ConfirmButton,
} from "../profile/CheckDefaultProfileImgNestDialog";
import { ProcessInfoStore } from "../../store/SuccessStore";

export const WriteUserButtonContainer = ({
  toggleEditing,
  editing,
  isMobile,
  postInfo,
}) => {
  const {
    doc,
    deleteDoc,
    collection,
    getDocs,
    orderBy,
    query,
    where,
    updateDoc,
    increment,
  } = dbFunction;

  const setIsUpdatePostList = useSetRecoilState(IsUpdatePostList);
  const setProcessInfoStore = useSetRecoilState(ProcessInfoStore);
  const navigate = useNavigate();
  const onDeleteClick = async (e) => {
    await deleteDoc(doc(dbService, "WorryPost", postInfo.id));
    const oldtagSnap = await getDocs(
      query(
        collection(dbService, "Tag"),
        where("tag_name", "==", postInfo.tag_name)
      )
    );
    if (oldtagSnap.docs.length === 0) {
      // console.log("Could not find Old Tag");
    } else {
      updateDoc(doc(dbService, "Tag", oldtagSnap.docs[0].id), {
        tag_count: increment(-1),
      });
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

    setProcessInfoStore((prev) => ({
      ...prev,
      finishDeletePost: true,
    }));
    navigate("/");
  };

  const [openDialogForDeletePost, setOpenDialogForDeletePost] = useState(false);
  const handleClickOpenDialogForDeletePost = () => {
    setOpenDialogForDeletePost(true);
  };

  const handleCloseDialogForDeletePost = () => {
    setOpenDialogForDeletePost(false);
  };

  return (
    <>
      <EditPostButton
        toggleEditing={toggleEditing}
        editing={editing}
        isMobile={isMobile}
      ></EditPostButton>
      {!editing && (
        <>
          <DeletePostButton
            onDeleteClick={handleClickOpenDialogForDeletePost}
            isMobile={isMobile}
          ></DeletePostButton>
          <Dialog
            open={openDialogForDeletePost}
            onClose={handleCloseDialogForDeletePost}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <WsDialogTitle>포스트를 삭제 하시겠습니까?</WsDialogTitle>
            <DialogActions>
              <ConfirmButton
                // onClick={}
                onClick={handleCloseDialogForDeletePost}
                color="primary"
                autoFocus
              >
                취소
              </ConfirmButton>
              <CancelButton color="primary" onClick={onDeleteClick}>
                삭제
              </CancelButton>
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  );
};

export const OtherUserButtonContainer = ({
  isMobile,
  isLikedByMe,
  postInfo,
  setPostInfo,
  setIsLikedByMe,
  setAlertInfo,
  postUserNickname,
}) => {
  const navigate = useNavigate();
  const {
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    collection,
    getDocs,
    getDoc,
    query,
    where,
    serverTimestamp,
  } = dbFunction;

  const setIsUpdatePostList = useSetRecoilState(IsUpdatePostList);
  const setStartFirstChat = useSetRecoilState(StartFirstChat);

  const [openDialogForStartChat, setOpenDialogForStartChat] = useState(false);
  const handleClickOpenDialogForStartChat = () => {
    setOpenDialogForStartChat(true);
  };

  const handleCloseDialogForStartChat = () => {
    setOpenDialogForStartChat(false);
  };

  const onStartChat = () => {
    setOpenDialogForStartChat(false);
    onClickChatButtonFromPost();
  };

  const [openDialogForReportPost, setOpenDialogForReportPost] = useState(false);
  const handleClickOpenDialogForReportPost = () => {
    setOpenDialogForReportPost(true);
  };
  const handleCloseDialogForReportPost = () => {
    setOpenDialogForReportPost(false);
  };

  const [openDialogForReportedPost, setOpenDialogForReportedPost] =
    useState(false);
  const handleClickOpenDialogForReportedPost = () => {
    setOpenDialogForReportedPost(true);
  };
  const handleCloseDialogForReportedPost = () => {
    setOpenDialogForReportedPost(false);
  };

  const onReportPostClick = () => {
    setOpenDialogForReportPost(false);
    reportPost();
    setAlertInfo((prev) => ({ ...prev, reportPost: true }));
    setTimeout(() => {
      setAlertInfo((prev) => ({ ...prev, reportPost: false }));
      setPostInfo((prev) => ({
        ...prev,
        post_report: true,
      }));
    }, 3000);
  };

  const toggleLike = async () => {
    const { uid: currentUserUid } = JSON.parse(
      sessionStorage.getItem(whisperSodlierSessionKey)
    );
    const postDocRef = doc(dbService, "WorryPost", postInfo.id);
    if (isLikedByMe) {
      const likeCheckQuery = query(
        collection(dbService, "PostLike"),
        where("associated_post_id", "==", postInfo.id),
        where("user_id", "==", currentUserUid)
      );
      const querySnapshot = await getDocs(likeCheckQuery);
      if (querySnapshot.docs.length === 0) {
        // console.log("you have not liked this yet.");
      } else {
        querySnapshot.forEach((like) => {
          deleteDoc(doc(dbService, "PostLike", like.id));
        });
      }
      await updateDoc(postDocRef, {
        like_count: postInfo.like_count - 1,
      }).then;
      setPostInfo((prev) => ({
        ...prev,
        like_count: postInfo.like_count - 1,
      }));
      setIsLikedByMe(false);
      setAlertInfo((prev) => ({ ...prev, subLikePost: true }));
      setTimeout(() => {
        setAlertInfo((prev) => ({ ...prev, subLikePost: false }));
      }, 3000);
    } else {
      await updateDoc(postDocRef, {
        like_count: postInfo.like_count + 1,
      }).then;
      setPostInfo((prev) => ({
        ...prev,
        like_count: postInfo.like_count + 1,
      }));
      await addDoc(collection(dbService, "PostLike"), {
        associated_post_id: postInfo.id,
        user_id: currentUserUid,
        created_timestamp: serverTimestamp(),
      }).then(setIsLikedByMe(true));
      setAlertInfo((prev) => ({ ...prev, addLikePost: true }));
      setTimeout(() => {
        setAlertInfo((prev) => ({ ...prev, addLikePost: false }));
      }, 3000);
    }
    setIsUpdatePostList((prev) => ({
      ...prev,
      searchPage: true,
      newestPage: true,
      popularPage: true,
    }));
  };

  const onClickChatButtonFromPost = async () => {
    const { uid: currentUserUid } = JSON.parse(
      sessionStorage.getItem(whisperSodlierSessionKey)
    );

    let checkQuery;
    if (postInfo.creator_id <= currentUserUid) {
      checkQuery = query(
        collection(dbService, "ChatPair"),
        where("member_ids", "==", [postInfo.creator_id, currentUserUid])
      );
    } else {
      checkQuery = query(
        collection(dbService, "ChatPair"),
        where("member_ids", "==", [currentUserUid, postInfo.creator_id])
      );
    }
    const checkSnapshot = await getDocs(checkQuery);
    if (checkSnapshot.docs.length === 0) {
      const newChatRef = await addDoc(collection(dbService, "ChatPair"), {
        created_timestamp: serverTimestamp(),
        is_report_and_block: "",
        member_ids:
          postInfo.creator_id <= currentUserUid
            ? [postInfo.creator_id, currentUserUid]
            : [currentUserUid, postInfo.creator_id],
        recentMessage: {
          message_text: null,
          read_by: [],
          sent_by: null,
          sent_timestamp: serverTimestamp(),
        },
      });
      setStartFirstChat((prev) => ({
        ...prev,
        exist: true,
        docUID: newChatRef.id,
      }));
      navigate("/message");
    } else {
      setStartFirstChat((prev) => ({
        ...prev,
        exist: true,
        docUID: checkSnapshot.docs[0].id,
      }));
      navigate("/message");
    }
  };

  const reportPost = async () => {
    await updateDoc(doc(dbService, "WorryPost", postInfo.id), {
      post_report: true,
      report_timestamp: serverTimestamp(),
    });
  };

  return (
    <>
      <LikeButton
        toggleLike={toggleLike}
        isMobile={isMobile}
        isLikedByMe={isLikedByMe}
      ></LikeButton>

      <PostChatButton
        isMobile={isMobile}
        onClickChatButtonFromPost={handleClickOpenDialogForStartChat}
      >
        채팅하기
      </PostChatButton>
      <Dialog
        open={openDialogForStartChat}
        onClose={handleCloseDialogForStartChat}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <WsDialogTitle>
          {postUserNickname ? postUserNickname : "익명"}와 채팅하시겠습니까?
        </WsDialogTitle>
        <DialogActions>
          <CancelButton
            onClick={handleCloseDialogForStartChat}
            color="primary"
            autoFocus
          >
            취소
          </CancelButton>
          <ConfirmButton color="primary" onClick={onStartChat}>
            채팅 시작
          </ConfirmButton>
        </DialogActions>
      </Dialog>

      <ReportButton
        onClick={
          postInfo.post_report
            ? handleClickOpenDialogForReportedPost
            : handleClickOpenDialogForReportPost
        }
        isMobile={isMobile}
      >
        신고하기
      </ReportButton>
      {postInfo.post_report ? (
        <Dialog
          open={openDialogForReportedPost}
          onClose={handleCloseDialogForReportedPost}
          aria-labelledby="alert-dialog-reported"
          aria-describedby="alert-dialog-reported"
        >
          <WsDialogTitle>이미 신고 접수된 포스트입니다.</WsDialogTitle>
          <DialogActions>
            <ConfirmButton
              color="primary"
              onClick={handleCloseDialogForReportedPost}
            >
              확인
            </ConfirmButton>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog
          open={openDialogForReportPost}
          onClose={handleCloseDialogForReportPost}
          aria-labelledby="alert-dialog-report"
          aria-describedby="alert-dialog-report"
        >
          <WsDialogTitle>포스트를 신고하시겠습니까?</WsDialogTitle>
          <DialogActions>
            <ConfirmButton
              onClick={handleCloseDialogForReportPost}
              color="primary"
              autoFocus
            >
              취소
            </ConfirmButton>
            <CancelButton color="primary" onClick={onReportPostClick}>
              신고
            </CancelButton>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

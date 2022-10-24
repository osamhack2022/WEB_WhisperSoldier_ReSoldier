import { Dialog, DialogActions } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { whisperSodlierSessionKey } from "../../lib/Const";
import { dbFunction, dbService } from "../../lib/FStore";
import checkCurseWord from "../../modules/CheckCurseWord";
import { StartFirstChat } from "../../store/ChatStore";
import {
  CommentBox,
  CommentButtonBox,
  CommentELementEditBox,
  CommentInfoBox,
  CommentText,
  CommentTimeText,
  CommentTitle,
  CommentUserBox,
  CommentUserText,
  DeleteCommentButton,
  EditComfirmButton,
  EditCommentButton,
  LikeCommentButton,
  MyInfoIconBox,
  PostChatCommentButton,
  ReportCommentButton,
} from "../../styles/PostContent/PostCommentElementStyle";
import { PostContentLikeCount } from "../../styles/PostContent/PostContentBodyStyle";
import { WsDialogTitle } from "../../styles/profile/CheckDefaultProfileImgDialogStyle";
import {
  CancelButton,
  ConfirmButton,
} from "../profile/CheckDefaultProfileImgNestDialog";

const PostCommentElement = ({
  commentElement,
  isOwner,
  getPostComments,
  created_timestamp,
  isTablet,
  isAdmin,
  setAlertInfo,
}) => {
  const [currentReportInfo, setCurrentReportInfo] = useState(
    commentElement.comment_report
  );
  const [isEditingComment, setIsEditingComment] = useState(false);
  const [newComment, setNewComment] = useState(commentElement.comment_text);
  const [editCommentErrorInfo, setEditCommentErrorInfo] = useState(false);
  const [countLikeInComment, setCountLikeInComment] = useState(0);

  const [isLikedByMe, setIsLikedByMe] = useState(false);

  const navigate = useNavigate();

  const [isReported, setIsReported] = useState(false);
  const [isReportAccepted, setIsReportAccepted] = useState(false);

  const [commentUserNickname, setCommentUserNickname] = useState("");
  const [commentUserProfileImg, setCommentUserProfileImg] = useState("");

  const { uid: currentUserUid } = JSON.parse(
    sessionStorage.getItem(whisperSodlierSessionKey)
  );

  const {
    query,
    collection,
    getDocs,
    where,
    addDoc,
    serverTimestamp,
    deleteDoc,
    updateDoc,
    doc,
    increment,
    getDoc,
  } = dbFunction;

  const setStartFirstChat = useSetRecoilState(StartFirstChat);

  const [openDialogForDeleteComment, setOpenDialogForDeleteComment] =
    useState(false);
  const handleClickOpenDialogForDeleteComment = () => {
    setOpenDialogForDeleteComment(true);
  };

  const handleCloseDialogForDeleteComment = () => {
    setOpenDialogForDeleteComment(false);
  };

  const [openDialogForStartChat, setOpenDialogForStartChat] = useState(false);
  const handleClickOpenDialogForStartChat = () => {
    setOpenDialogForStartChat(true);
  };

  const handleCloseDialogForStartChat = () => {
    setOpenDialogForStartChat(false);
  };

  const onStartChat = () => {
    setOpenDialogForStartChat(false);
    onClickChatButtonFromComment();
  };

  const [openDialogForEditComment, setOpenDialogForEditComment] =
    useState(false);

  const handleClickOpenDialogForEditComment = () => {
    if (newComment.length === 0) {
      setEditCommentErrorInfo(true);
      setTimeout(() => {
        setEditCommentErrorInfo(false);
      }, 3000);
    } else {
      const curseWord = checkCurseWord(newComment);
      if (curseWord) {
        alert(
          "욕 또는 비속어가 감지되었습니다. 해당 욕은 " + curseWord + "입니다."
        );
      } else {
        setOpenDialogForEditComment(true);
      }
    }
  };

  const handleCloseDialogForEditComment = () => {
    setOpenDialogForEditComment(false);
  };

  const onEditCommentClick = () => {
    setOpenDialogForEditComment(false);
    onCommentEditAndSubmit();
  };

  const [openDialogForReportComment, setOpenDialogForReportComment] =
    useState(false);
  const handleClickOpenDialogForReportComment = () => {
    setOpenDialogForReportComment(true);
  };
  const handleCloseDialogForReportComment = () => {
    setOpenDialogForReportComment(false);
  };

  const onReportCommentClick = () => {
    setOpenDialogForReportComment(false);
    reportComment();
  };

  const [openDialogForReportedComment, setOpenDialogForReportedComment] =
    useState(false);
  const handleClickOpenDialogForReportedComment = () => {
    setOpenDialogForReportedComment(true);
  };
  const handleCloseDialogForReportedComment = () => {
    setOpenDialogForReportedComment(false);
  };

  const getLikeCheckQuery = (currentUserUid) => {
    return query(
      collection(dbService, "CommentLike"),
      where("associated_comment_id", "==", commentElement.id),
      where("user_id", "==", currentUserUid)
    );
  };

  const getIsLiked = async () => {
    const querySnapshot = await getDocs(getLikeCheckQuery(currentUserUid));
    if (querySnapshot.docs.length === 0) {
      setIsLikedByMe(false);
    } else {
      setIsLikedByMe(true);
    }
    const afterLikeActionSnapshot = await getDocs(
      getLikeCheckQuery(currentUserUid)
    );
    await updateDoc(doc(dbService, "Comment", commentElement.id), {
      like_count: afterLikeActionSnapshot.docs.length,
    });
  };

  const toggleLike = async () => {
    console.log("toggleLike - Comment");
    const commentDocRef = doc(dbService, "Comment", commentElement.id);
    if (isLikedByMe) {
      const querySnapshot = await getDocs(getLikeCheckQuery(currentUserUid));
      if (querySnapshot.docs.length === 0) {
        // console.log("you have not liked this yet.");
      } else {
        querySnapshot.forEach((like) => {
          deleteDoc(doc(dbService, "CommentLike", like.id));
        });
      }
      setAlertInfo((prev) => ({ ...prev, subLikeComment: true }));
      setTimeout(() => {
        setAlertInfo((prev) => ({ ...prev, subLikeComment: false }));
      }, 3000);
      setIsLikedByMe(false);
      setCountLikeInComment((prev) => prev - 1);
    } else {
      await addDoc(collection(dbService, "CommentLike"), {
        associated_comment_id: commentElement.id,
        user_id: currentUserUid,
        created_timestamp: serverTimestamp(),
      });
      setIsLikedByMe(true);
      // console.log("Liked");
      setCountLikeInComment((prev) => prev + 1);
      setAlertInfo((prev) => ({ ...prev, addLikeComment: true }));
      setTimeout(() => {
        setAlertInfo((prev) => ({ ...prev, addLikeComment: false }));
      }, 3000);
    }
    const afterLikeActionSnapshot = await getDocs(
      getLikeCheckQuery(currentUserUid)
    );
    await updateDoc(commentDocRef, {
      like_count: afterLikeActionSnapshot.docs.length,
    });
  };

  const onClickChatButtonFromComment = async () => {
    //채팅방이 이미 존재하는지 체크하기
    let checkQuery;
    if (commentElement.commentor_id <= currentUserUid) {
      checkQuery = query(
        collection(dbService, "ChatPair"),
        where("member_ids", "==", [commentElement.commentor_id, currentUserUid])
      );
    } else {
      checkQuery = query(
        collection(dbService, "ChatPair"),
        where("member_ids", "==", [currentUserUid, commentElement.commentor_id])
      );
    }
    const checkSnapshot = await getDocs(checkQuery);
    if (checkSnapshot.docs.length === 0) {
      console.log("새 채팅방을 생성");
      const newChatRef = await addDoc(collection(dbService, "ChatPair"), {
        created_timestamp: serverTimestamp(),
        is_report_and_block: "",
        member_ids:
          commentElement.commentor_id <= currentUserUid
            ? [commentElement.commentor_id, currentUserUid]
            : [currentUserUid, commentElement.commentor_id],
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
      console.log("기존 채팅방 존재");
      setStartFirstChat((prev) => ({
        ...prev,
        exist: true,
        docUID: checkSnapshot.docs[0].id,
      }));
      navigate("/message");
    }
  };

  const onDeleteCommentClick = async () => {
    console.log(`deleting ${commentElement.id}`);
    await deleteDoc(doc(dbService, "Comment", commentElement.id));
    const updateRef = doc(
      dbService,
      "WorryPost",
      commentElement.associated_post_id
    );
    await updateDoc(updateRef, {
      comment_count: increment(-1),
    });
    getPostComments(false, true);
    setAlertInfo((prev) => ({ ...prev, deleteComment: true }));
    setTimeout(() => {
      setAlertInfo((prev) => ({ ...prev, deleteComment: false }));
    }, 3000);
  };

  const toggleCommentEditing = () => {
    if (!isEditingComment) {
      setNewComment(commentElement.comment_text);
    }
    setIsEditingComment((prev) => !prev);
  };

  const onCommentEditAndSubmit = async () => {
    await updateDoc(doc(dbService, "Comment", commentElement.id), {
      comment_text: newComment,
    });
    setIsEditingComment(false);
    getPostComments(false, true);
    setAlertInfo((prev) => ({ ...prev, editComment: true }));
    setTimeout(() => {
      setAlertInfo((prev) => ({ ...prev, editComment: false }));
    }, 3000);
  };

  const onCommentChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewComment(value);
  };

  const getPostUserNickname = async (commentor_id) => {
    const userDoc = await getDoc(doc(dbService, "User", commentor_id));

    if (userDoc.data()) {
      setCommentUserNickname(userDoc.data().nickname);
      setCommentUserProfileImg(userDoc.data().profileImg);
    }
  };
  const getReportStatuses = async () => {
    const reportCheckSnap = await getDoc(
      doc(dbService, "Comment", commentElement.id)
    );
    if (reportCheckSnap.data().comment_report) {
      console.log("이미 신고된 댓글임");
      setIsReported(true);
    }
    if (reportCheckSnap.data().comment_rep_accept) {
      console.log("블라인드된 댓글임");
      setIsReportAccepted(true);
    }
  };
  const onClickReportComment = async () => {
    if (isReported) {
      alert("이미 누군가에 의해 신고된 댓글입니다.");
    } else {
      updateDoc(doc(dbService, "Comment", commentElement.id), {
        comment_report: true,
      })
        .then(alert("신고가 접수되었습니다. 관리자 확인 후 처리 예정입니다."))
        .then(setIsReported(true));
    }
  };

  const reportComment = async () => {
    await updateDoc(doc(dbService, "Comment", commentElement.id), {
      comment_report: true,
      report_timestamp: serverTimestamp(),
    });
    setCurrentReportInfo(true);
    setAlertInfo((prev) => ({ ...prev, reportComment: true }));
    setTimeout(() => {
      setAlertInfo((prev) => ({ ...prev, reportComment: false }));
    }, 3000);
  };

  useEffect(() => {
    getIsLiked();
    getReportStatuses();
    setCountLikeInComment(commentElement.like_count);
    getPostUserNickname(commentElement.commentor_id);
    // eslint-disable-next-line
  }, []);

  return (
    <CommentBox>
      <CommentTitle>
        <CommentUserBox>
          <MyInfoIconBox
            commentUserProfileImg={commentUserProfileImg}
          ></MyInfoIconBox>
          <CommentUserText>
            {commentUserNickname.length > 0 ? commentUserNickname : "익명"}
          </CommentUserText>
        </CommentUserBox>
      </CommentTitle>
      {!isEditingComment ? (
        <CommentText>
          {commentElement.comment_rep_accept
            ? "관리자에 의해 블라인드 처리된 댓글입니다."
            : commentElement.comment_text}
        </CommentText>
      ) : (
        <CommentELementEditBox
          newComment={newComment}
          onCommentChange={onCommentChange}
        ></CommentELementEditBox>
      )}
      {!isEditingComment && (
        <CommentInfoBox>
          <CommentTimeText>{created_timestamp}</CommentTimeText>
          <PostContentLikeCount isMyLike={isLikedByMe}>
            {countLikeInComment}
          </PostContentLikeCount>
        </CommentInfoBox>
      )}

      {!isAdmin &&
        !commentElement.comment_rep_accept &&
        (isOwner ? (
          <CommentButtonBox>
            <EditCommentButton
              toggleEditing={toggleCommentEditing}
              editing={isEditingComment}
              isMobile={!isTablet}
            ></EditCommentButton>
            {isEditingComment ? (
              <>
                <EditComfirmButton
                  onCommentChange={handleClickOpenDialogForEditComment}
                  editCommentErrorInfo={editCommentErrorInfo}
                  isMobile={!isTablet}
                ></EditComfirmButton>
                <Dialog
                  open={openDialogForEditComment}
                  onClose={handleCloseDialogForEditComment}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <WsDialogTitle>댓글을 수정 하시겠습니까?</WsDialogTitle>
                  <DialogActions>
                    <CancelButton
                      // onClick={}
                      onClick={handleCloseDialogForEditComment}
                      color="primary"
                      autoFocus
                    >
                      취소
                    </CancelButton>
                    <ConfirmButton color="primary" onClick={onEditCommentClick}>
                      수정하기
                    </ConfirmButton>
                  </DialogActions>
                </Dialog>
              </>
            ) : (
              <>
                <DeleteCommentButton
                  onDeleteClick={handleClickOpenDialogForDeleteComment}
                  isMobile={!isTablet}
                ></DeleteCommentButton>
                <Dialog
                  open={openDialogForDeleteComment}
                  onClose={handleCloseDialogForDeleteComment}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <WsDialogTitle>댓글을 삭제 하시겠습니까?</WsDialogTitle>
                  <DialogActions>
                    <ConfirmButton
                      // onClick={}
                      onClick={handleCloseDialogForDeleteComment}
                      color="primary"
                      autoFocus
                    >
                      취소
                    </ConfirmButton>
                    <CancelButton
                      color="primary"
                      onClick={onDeleteCommentClick}
                    >
                      삭제
                    </CancelButton>
                  </DialogActions>
                </Dialog>
              </>
            )}
          </CommentButtonBox>
        ) : (
          <CommentButtonBox>
            <LikeCommentButton
              toggleLike={toggleLike}
              isMobile={!isTablet}
              isLikedByMe={isLikedByMe}
            >
              {isLikedByMe ? "공감 취소하기" : "공감하기"}
            </LikeCommentButton>
            <PostChatCommentButton
              toLink="/"
              isMobile={!isTablet}
              onClickChatButtonFromComment={handleClickOpenDialogForStartChat}
            >
              채팅하기
            </PostChatCommentButton>
            <Dialog
              open={openDialogForStartChat}
              onClose={handleCloseDialogForStartChat}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <WsDialogTitle>
                {commentUserNickname.length > 0 ? commentUserNickname : "익명"}
                와 채팅하시겠습니까?
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

            <ReportCommentButton
              onClick={
                currentReportInfo
                  ? handleClickOpenDialogForReportedComment
                  : handleClickOpenDialogForReportComment
              }
              isMobile={!isTablet}
            >
              신고하기
            </ReportCommentButton>
            {currentReportInfo ? (
              <Dialog
                open={openDialogForReportedComment}
                onClose={handleCloseDialogForReportedComment}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <WsDialogTitle>이미 신고 접수된 댓글입니다.</WsDialogTitle>
                <DialogActions>
                  <ConfirmButton
                    color="primary"
                    onClick={handleCloseDialogForReportedComment}
                  >
                    확인
                  </ConfirmButton>
                </DialogActions>
              </Dialog>
            ) : (
              <Dialog
                open={openDialogForReportComment}
                onClose={handleCloseDialogForReportComment}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <WsDialogTitle>댓글을 신고하시겠습니까?</WsDialogTitle>
                <DialogActions>
                  <ConfirmButton
                    onClick={handleCloseDialogForReportComment}
                    color="primary"
                    autoFocus
                  >
                    취소
                  </ConfirmButton>
                  <CancelButton color="primary" onClick={onReportCommentClick}>
                    신고
                  </CancelButton>
                </DialogActions>
              </Dialog>
            )}
          </CommentButtonBox>
        ))}
    </CommentBox>
  );
};

export default PostCommentElement;

/** 
 *         <form onSubmit={onCommentEditAndSubmit}>
          <textarea
            style={{ whiteSpace: "pre-wrap" }}
            value={newComment}
            onChange={onCommentChange}
          />
          <button type="submit">댓글 수정</button>
        </form>
*/

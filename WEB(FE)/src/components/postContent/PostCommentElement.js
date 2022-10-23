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
import { PostContentLikeCount } from "../../styles/PostContent/PostContentTitleStyle";

const PostCommentElement = ({
  commentElement,
  isOwner,
  getPostComments,
  created_timestamp,
  isTablet,
  isAdmin,
}) => {
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
        console.log("you have not liked this yet.");
      } else {
        querySnapshot.forEach((like) => {
          deleteDoc(doc(dbService, "CommentLike", like.id));
        });
      }
      setIsLikedByMe(false);
      setCountLikeInComment((prev) => prev - 1);
    } else {
      await addDoc(collection(dbService, "CommentLike"), {
        associated_comment_id: commentElement.id,
        user_id: currentUserUid,
        created_timestamp: serverTimestamp(),
      });
      setIsLikedByMe(true);
      console.log("Liked");
      setCountLikeInComment((prev) => prev + 1);
    }
    const afterLikeActionSnapshot = await getDocs(
      getLikeCheckQuery(currentUserUid)
    );
    await updateDoc(commentDocRef, {
      like_count: afterLikeActionSnapshot.docs.length,
    });
  };

  const onClickChatButtonFromComment = async (e) => {
    e.preventDefault();
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
    const check = window.confirm("정말로 댓글을 삭제하시겠습니까?");
    if (check) {
      console.log(`deleting ${commentElement.id}`);
      await deleteDoc(doc(dbService, "Comment", commentElement.id)).then(
        alert("댓글이 삭제되었습니다.")
      );
      const updateRef = doc(
        dbService,
        "WorryPost",
        commentElement.associated_post_id
      );
      await updateDoc(updateRef, {
        comment_count: increment(-1),
      });
      getPostComments(false, true);
    }
  };

  const toggleCommentEditing = () => {
    if (!isEditingComment) {
      setNewComment(commentElement.comment_text);
    }
    setIsEditingComment((prev) => !prev);
  };

  const onCommentEditAndSubmit = async (e) => {
    e.preventDefault();
    const curseWord = checkCurseWord(newComment);
    console.log("newComment.lenght === 0", newComment.length === 0);
    if (newComment.length === 0) {
      setEditCommentErrorInfo(true);
      setTimeout(() => {
        setEditCommentErrorInfo(false);
      }, 3000);
    } else if (curseWord) {
      alert("욕 또는 비속어가 감지되었습니다. 해당 욕은 " + curseWord + "입니다.");
    } else {
      const check = window.confirm("정말로 댓글을 수정하시겠습니까?");
      if (check) {
        await updateDoc(doc(dbService, "Comment", commentElement.id), {
          comment_text: newComment,
        }).then(alert("댓글을 수정하였습니다."));
        setIsEditingComment(false);
        getPostComments(false, true);
      }
    }
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
    const reportCheckSnap = await getDoc(doc(dbService, "Comment", commentElement.id));
    if (reportCheckSnap.data().comment_report) {
      console.log("이미 신고된 댓글임");
      setIsReported(true);
    }
    if (reportCheckSnap.data().comment_rep_accept) {
      console.log("블라인드된 댓글임")
      setIsReportAccepted(true);
    }
  }
  const onClickReportComment = async () => {
    if (isReported) {
      alert("이미 누군가에 의해 신고된 댓글입니다.");
    } else {
      updateDoc(doc(dbService, "Comment", commentElement.id), {
        "comment_report": true,
      })
      .then(alert("신고가 접수되었습니다. 관리자 확인 후 처리 예정입니다."))
      .then(setIsReported(true));
    };
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
        <CommentTimeText>{created_timestamp}</CommentTimeText>
        <PostContentLikeCount isMyLike={isLikedByMe}>
          {countLikeInComment}
        </PostContentLikeCount>
      </CommentTitle>
      {!isEditingComment ? (
        <CommentText>{commentElement.comment_rep_accept ?
          ("관리자에 의해 블라인드 처리된 댓글입니다."
          ) : (
          commentElement.comment_text)}</CommentText>
      ) : (
        <CommentELementEditBox
          newComment={newComment}
          onCommentChange={onCommentChange}
        ></CommentELementEditBox>
      )}
      {!isAdmin && !commentElement.comment_rep_accept &&
        (isOwner ? (
          <CommentButtonBox>
            <EditCommentButton
              toggleEditing={toggleCommentEditing}
              editing={isEditingComment}
              isMobile={!isTablet}
            ></EditCommentButton>
            {isEditingComment ? (
              <EditComfirmButton
                onCommentChange={onCommentEditAndSubmit}
                editCommentErrorInfo={editCommentErrorInfo}
                isMobile={!isTablet}
              ></EditComfirmButton>
            ) : (
              <DeleteCommentButton
                onDeleteClick={onDeleteCommentClick}
                isMobile={!isTablet}
              ></DeleteCommentButton>
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
              onClickChatButtonFromComment={onClickChatButtonFromComment}
            >
              채팅하기
            </PostChatCommentButton>
            <ReportCommentButton onClickReportComment={onClickReportComment} isMobile={!isTablet}>
              {isReported ? "신고가 접수됨" : "신고하기"}
            </ReportCommentButton>
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

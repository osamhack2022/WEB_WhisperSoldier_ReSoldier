import {
  deleteDoc,
  updateDoc,
  doc,
  query,
  collection,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  increment,
  getDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { whisperSodlierSessionKey } from "../../lib/Const";
import { dbFunction, dbService } from "../../lib/FStore";
import {
  CommentBox,
  CommentButtonBox,
  CommentELementEditBox,
  CommentText,
  CommentTimeText,
  CommentTitle,
  CommentUserBox,
  CommentUserIcon,
  CommentUserText,
  DeleteCommentButton,
  EditComfirmButton,
  EditCommentButton,
  LikeCommentButton,
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
}) => {
  const [isEditingComment, setIsEditingComment] = useState(false);
  const [newComment, setNewComment] = useState(commentElement.comment_text);
  const [editCommentErrorInfo, setEditCommentErrorInfo] = useState(false);
  const [countLikeInComment, setCountLikeInComment] = useState(0);

  const [isLikedByMe, setIsLikedByMe] = useState(false);

  const navigate = useNavigate();

  const getLikeCheckQuery = (currentUserUid) => {
    return query(
      collection(dbService, "CommentLike"),
      where("associated_comment_id", "==", commentElement.id),
      where("user_id", "==", currentUserUid)
    );
  };

  const getIsLiked = async () => {
    const { uid: currentUserUid } = JSON.parse(
      sessionStorage.getItem(whisperSodlierSessionKey)
    );

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
    const { uid: currentUserUid } = JSON.parse(
      sessionStorage.getItem(whisperSodlierSessionKey)
    );
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
    const { uid: currentUserUid } = JSON.parse(
      sessionStorage.getItem(whisperSodlierSessionKey)
    );
    e.preventDefault();
    //아직은 따로 설정을 안해줘서 undefined인 모양이다 -> 원래 uid로 조회가 안되는듯!
    const { query, collection, getDocs, where, addDoc, serverTimestamp } = dbFunction;
    //채팅방이 이미 존재하는지 체크하기
    console.log("commentElement commentor_id :", commentElement.commentor_id)
    let checkQuery;
    if (commentElement.commentor_id <= currentUserUid) {
      checkQuery = query(collection(dbService, "ChatPair"),
      where("member_ids", "==", [commentElement.commentor_id, currentUserUid]),
    )
    } else {
      checkQuery = query(collection(dbService, "ChatPair"),
      where("member_ids", "==", [currentUserUid, commentElement.commentor_id]),
    )
    }
    const checkSnapshot = await getDocs(checkQuery)
    if (checkSnapshot.docs.length === 0) {
      //만약 없다면, 새로 만들기
      console.log("찾은 개수 0. 채팅방을 생성하기");
      const commentorSnap = await getDoc(doc(dbService, "User", commentElement.commentor_id));
      const commentor_displayName = commentorSnap.data().nickname;
      const currentUserSnap = await getDoc(doc(dbService, "User", currentUserUid));
      const currentUser_displayName = currentUserSnap.data().nickname;

      await addDoc(collection(dbService, "ChatPair"), {
        created_timestamp: serverTimestamp(),
        is_report_and_block: false,
        member_ids: ((commentElement.commentor_id <= currentUserUid) ? [commentElement.commentor_id, currentUserUid] : [currentUserUid, commentElement.commentor_id]),
        members: [
          {
            member_displayname: commentor_displayName,
            member_id: commentElement.commentor_id,
          },
          {
            member_displayname: currentUser_displayName,
            member_id: currentUserUid,
          }
        ],
        recentMessage: {
          message_text: null,
          read_by: [],
          sent_by: null,
          sent_timestamp: serverTimestamp(),
        },
      });
      console.log("채팅방 생성 완료. chatPage로 navigate...");
      navigate("/message");
    } else {
      //있다면, 일단 채팅페이지로 navigate
      console.log("찾았음! chatPage로 내비게이트");
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
      // 댓글창 업데이트 (isAddingComments = false, isDeletingComments = true)
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
    console.log("newComment.lenght === 0", newComment.length === 0);
    if (newComment.length === 0) {
      setEditCommentErrorInfo(true);
      setTimeout(() => {
        setEditCommentErrorInfo(false);
      }, 3000);
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

  useEffect(() => {
    getIsLiked();
    setCountLikeInComment(commentElement.like_count);
    // eslint-disable-next-line
  }, []);

  return (
    <CommentBox>
      <CommentTitle>
        <CommentUserBox>
          <CommentUserIcon></CommentUserIcon>
          <CommentUserText>익명</CommentUserText>
        </CommentUserBox>
        <CommentTimeText>{created_timestamp}</CommentTimeText>
        <PostContentLikeCount isMyLike={isLikedByMe}>
          {countLikeInComment}
        </PostContentLikeCount>
      </CommentTitle>
      {!isEditingComment ? (
        <CommentText>{commentElement.comment_text}</CommentText>
      ) : (
        <CommentELementEditBox
          newComment={newComment}
          onCommentChange={onCommentChange}
        ></CommentELementEditBox>
      )}
      {isOwner ? (
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
          <PostChatCommentButton toLink="/" isMobile={!isTablet} onClickChatButtonFromComment={onClickChatButtonFromComment}>
            채팅하기
          </PostChatCommentButton>
          <ReportCommentButton toLink="/" isMobile={!isTablet}>
            신고하기
          </ReportCommentButton>
        </CommentButtonBox>
      )}
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

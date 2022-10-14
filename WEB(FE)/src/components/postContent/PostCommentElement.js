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
import { whisperSodlierSessionKey } from "../../lib/Const";
import { dbService } from "../../lib/FStore";
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

  const [commentUserNickname, setCommentUserNickname] = useState("");

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

  const onClickChatButton = async (e) => {
    //채팅방이 이미 존재하는지 체크하기
    //만약 없다면, 새로 만들기
    //있다면, 일단 채팅페이지로 navigate
    //서브컬렉션도 이 단계에서 만들어줘야되는건가...?? 아닌가? 알아봐야됨
    //밑에 있는 예시 기반으로 문서 추가 예정
    await addDoc(collection(dbService, "Comment"), {
      /* commentor_id: authService.currentUser.uid,
      associated_post_id: postInfo.id,
      comment_text: state.comment,
      comment_report: false,
      comment_rep_accept: false,
      like_count: 0,
      created_timestamp: serverTimestamp(), */
    });
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

  const getPostUserNickname = async (commentor_id) => {
    const nicknameDoc = await getDoc(doc(dbService, "User", commentor_id));

    if (nicknameDoc.data()) {
      setCommentUserNickname(nicknameDoc.data().nickname);
    }
  };

  useEffect(() => {
    getIsLiked();
    console.log(commentElement);
    setCountLikeInComment(commentElement.like_count);
    getPostUserNickname(commentElement.commentor_id);
    // eslint-disable-next-line
  }, []);

  return (
    <CommentBox>
      <CommentTitle>
        <CommentUserBox>
          <CommentUserIcon></CommentUserIcon>
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
          <PostChatCommentButton toLink="/" isMobile={!isTablet}>
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

import { dbFunction, dbService } from "../../lib/FStore";
import {
  DeletePostButton,
  EditPostButton,
  LikeButton,
  PostChatButton,
  ReportButton,
} from "../common/Buttons";

export const WriteUserButtonContainer = ({
  onDeleteClick,
  toggleEditing,
  editing,
  isMobile,
}) => {
  return (
    <>
      <EditPostButton
        toggleEditing={toggleEditing}
        editing={editing}
        isMobile={isMobile}
      ></EditPostButton>
      {!editing && (
        <DeletePostButton
          onDeleteClick={onDeleteClick}
          isMobile={isMobile}
        ></DeletePostButton>
      )}
    </>
  );
};

export const OtherUserButtonContainer = ({
  isMobile,
  toggleLike,
  isLikedByMe,
}) => {
  const onClickChatButtonFromPost = async (e) => {
    const { query, addDoc, collection, orderBy, onSnapshot, where, getDocs } = dbFunction;
    //채팅방이 이미 존재하는지 체크하기
    const res = await getDocs(dbService, "ChatPair");
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
  return (
    <>
      <LikeButton
        toggleLike={toggleLike}
        isMobile={isMobile}
        isLikedByMe={isLikedByMe}
      ></LikeButton>

      <PostChatButton toLink="/" isMobile={isMobile}>
        채팅하기
      </PostChatButton>
      <ReportButton toLink="/" isMobile={isMobile}>
        신고하기
      </ReportButton>
    </>
  );
};

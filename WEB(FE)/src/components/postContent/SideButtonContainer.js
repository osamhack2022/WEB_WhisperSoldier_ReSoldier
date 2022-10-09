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
  return (
    <>
      {isLikedByMe ? (
        <LikeButton toggleLike={toggleLike} isMobile={isMobile}>
          취소하기
        </LikeButton>
      ) : (
        <LikeButton toggleLike={toggleLike} isMobile={isMobile}>
          공감하기
        </LikeButton>
      )}

      <PostChatButton toLink="/" isMobile={isMobile}>
        채팅하기
      </PostChatButton>
      <ReportButton toLink="/" isMobile={isMobile}>
        신고하기
      </ReportButton>
    </>
  );
};

import { DeletePostButton, EditPostButton, LikeButton, PostChatButton, ReportButton } from "../common/Buttons";


export const WriteUserButtonContainer = ({
  onDeleteClick,
  toggleEditing,
  editing,
}) => {
  return (
    <>
      <EditPostButton toggleEditing={toggleEditing} editing={editing}></EditPostButton>
      {!editing && <DeletePostButton onDeleteClick={onDeleteClick}></DeletePostButton>}
    </>
  );
};

export const OtherUserButtonContainer = () => {
  return (
    <>
      <LikeButton toLink="/">공감하기</LikeButton>
      <PostChatButton toLink="/">채팅하기</PostChatButton>
      <ReportButton toLink="/">신고하기</ReportButton>
    </>
  );
};

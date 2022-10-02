import { LikeButton, PostChatButton, ReportButton } from "../common/Buttons";
import { DeleteButton, EditButton } from "./Test";

export const WriteUserButtonContainer = ({
  onDeleteClick,
  toggleEditing,
  editing,
}) => {
  return (
    <>
      <EditButton toggleEditing={toggleEditing} editing={editing}></EditButton>
      {!editing && <DeleteButton onDeleteClick={onDeleteClick}></DeleteButton>}
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

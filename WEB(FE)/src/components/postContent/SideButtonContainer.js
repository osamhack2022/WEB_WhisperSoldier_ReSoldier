import { FindPasswordButton } from "../common/Buttons";
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
      <FindPasswordButton toLink="/">공감하기</FindPasswordButton>
      <FindPasswordButton toLink="/">채팅하기</FindPasswordButton>
      <FindPasswordButton toLink="/">신고하기</FindPasswordButton>
    </>
  );
};

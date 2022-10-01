import { FindPasswordButton } from "../common/Buttons"
import { DeleteButton, EditButton } from "./Test";

export const WriteUserButtonContainer = ({onDeleteClick, toggleEditing}) =>{
    return (
        <>
            <EditButton toggleEditing={toggleEditing}></EditButton>
            <DeleteButton onDeleteClick={onDeleteClick}></DeleteButton>
        </>
    )
}

export const OtherUserButtonContainer= () =>{
    return (
        <>
            <FindPasswordButton toLink="/">공감하기</FindPasswordButton>
            <FindPasswordButton toLink="/">채팅하기</FindPasswordButton>
            <FindPasswordButton toLink="/">신고하기</FindPasswordButton>
        </>
    );
}
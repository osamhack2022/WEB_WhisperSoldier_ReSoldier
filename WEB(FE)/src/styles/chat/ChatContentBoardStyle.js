import styled from "styled-components";
import media from "../../modules/MediaQuery";
import { BiSend } from "react-icons/bi";

export const ChatContentContainer = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  height: 480px;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
  flex-grow: 1;
  ${media.mobile`
  flex-grow : inherit;
  width: 100%;
  `}
`;

export const ChatContentHeaderBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 10px;
  height: fit-content;
  width: 100%;
  background-color: #fbfbfb;
  border-radius: 5px;
  border-bottom: 1px solid rgb(189, 189, 189);
`;

export const ChatContentText = styled.div`
  margin-left: 10px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.2;
`;

export const ChatContentBox = styled.div`
  flex-grow: 1;
  padding: 10px 20px;
  overflow-y: scroll;
`;

export const ChatInputBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0px 0px 0px;
  padding: 10px 20px;
  height: fit-content;
  width: 100%;
  background-color: #fbfbfb;
  border-radius: 5px;
  border-top: 1px solid rgb(189, 189, 189);
`;

export const ChatInput = styled.input`
  background-color: #fbfbfb;
  width: 80%;
  /* height: 40px; */
  flex-grow: 1;
  margin-right: 10px;
  padding: 7px 15px;
  white-space: pre-wrap;
  border: none;
  border: 1px solid rgb(189, 189, 189);
  border-radius: 25px;
  resize: none;
  font-size: 14px;
  &:focus {
    outline: none;
  }
`;

const SendMessageIcon = styled(BiSend)`
  width: 20px;
  height: 14px;
  color: #1a7541;
  transition: all 0.5s;
`;

const SendMessageButtonBox = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 1.5px solid #1a7541;
  transition: all 0.5s;
  cursor: pointer;
  &:hover ${SendMessageIcon} {
    color: #ffffff;
  }
  &:hover {
    background-color: #1a7541;
  }
`;

export const SendMessageButton = ({ onChatSubmit }) => {
  return (
    <SendMessageButtonBox onClick={onChatSubmit}>
      <SendMessageIcon></SendMessageIcon>
    </SendMessageButtonBox>
  );
};

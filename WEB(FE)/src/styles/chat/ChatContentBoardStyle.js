import styled from "styled-components";
import media from "../../modules/MediaQuery";
import { BiSend } from "react-icons/bi";

export const ChatContentContainer = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  height: fit-content;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
  flex-grow: 1;
  ${media.mobile`
  margin-left: inherit;
  margin-top : 10px;
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
  height: 400px;
  padding: 10px 20px;
  overflow-y: scroll;
  /* 커스텀 스크롤바
  &:-webkit-scrollbar {
    width: 10px;
  }

  &:-webkit-scrollbar-thumb {
    height: 10%;
    background: #0d552c;
    border-radius: 25px;
  }

  &:-webkit-scrollbar-track {
    background: #c8c8c8;
  }
  */
`;

export const ChatInputBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
  height: fit-content;
  width: 100%;
  background-color: #fbfbfb;
  border-radius: 5px;
  border-top: 1px solid rgb(189, 189, 189);
`;

export const ChatInput = styled.textarea`
  background-color: #fbfbfb;
  width: 80%;
  height: 40px;
  max-height: 70px;
  flex-grow: 1;
  margin-right: 10px;
  padding: 7px 30px;
  white-space: pre-wrap;
  border: none;
  border: 1px solid rgb(189, 189, 189);
  border-radius: 25px;
  resize: none;
  white-space: pre-wrap;
  font-size: 13px;
  overflow: hidden;
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

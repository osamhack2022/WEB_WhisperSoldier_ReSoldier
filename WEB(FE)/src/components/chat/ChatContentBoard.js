import { useForm } from "../../modules/useForm";
import ChatContentElement from "./ChatContentElement";
import { useEffect, useRef, useState } from "react";
import { MyInfoIconBox } from "../../styles/profile/ProfilePageStyle";
import {
  ChatContentBox,
  ChatContentContainer,
  ChatContentHeaderBox,
  ChatContentText,
  ChatInput,
  ChatInputBox,
  SendMessageButton,
} from "../../styles/chat/ChatContentBoardStyle";

const ChatContentBoard = () => {
  const scrollRef = useRef();
  const [chatInput, onChange] = useForm({ message: "" });
  const [errorChatInfo, setErrorChatInfo] = useState({
    isErr: false,
  });

  const onChatSubmit = (e) => {
    e.preventDefault();
    if (chatInput.message.length === 0) {
      setErrorChatInfo((prev) => ({ ...prev, isErr: true }));
      setTimeout(() => {
        setErrorChatInfo((prev) => ({ ...prev, isErr: false }));
      }, 3000);
    } else {
      //submit chat to database
    }
  };

  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, []);

  return (
    <ChatContentContainer>
      <ChatContentHeaderBox>
        <MyInfoIconBox></MyInfoIconBox>
        <ChatContentText>나와 채팅하는 사람의 닉네임</ChatContentText>
      </ChatContentHeaderBox>

      <ChatContentBox ref={scrollRef}>
        <ChatContentElement></ChatContentElement>
        <ChatContentElement></ChatContentElement>
        <ChatContentElement isMe={true}></ChatContentElement>
        <ChatContentElement></ChatContentElement>
        <ChatContentElement></ChatContentElement>
        <ChatContentElement></ChatContentElement>
        <ChatContentElement isMe={true}></ChatContentElement>
        <ChatContentElement></ChatContentElement>
        <ChatContentElement></ChatContentElement>
        <ChatContentElement isMe={true}></ChatContentElement>
        <ChatContentElement isMe={true}></ChatContentElement>
        <ChatContentElement></ChatContentElement>
        <ChatContentElement isMe={true}></ChatContentElement>
        <ChatContentElement></ChatContentElement>
      </ChatContentBox>

      <ChatInputBox>
        <ChatInput
          name="message"
          type="text"
          onChange={onChange}
          value={chatInput.message}
          placeholder="메시지를 입력하세요"
          isErr={errorChatInfo.isErr}
          autoFocus
        ></ChatInput>
        <SendMessageButton onChatSubmit={onChatSubmit}></SendMessageButton>
      </ChatInputBox>
    </ChatContentContainer>
  );
};

export default ChatContentBoard;

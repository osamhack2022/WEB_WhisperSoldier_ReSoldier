import { useForm } from "../../modules/useForm";
import ChatContentElement from "./ChatContentElement";
import { useCallback, useEffect, useRef, useState } from "react";
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

const ChatContentBoard = ({ setSHowChatContent }) => {
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

  const autoResizeTextarea = useCallback(() => {
    let textarea = document.querySelector(".autoTextarea");

    if (textarea) {
      textarea.style.height = "40px";
      let height = textarea.scrollHeight; // 높이
      textarea.style.height = `${height}px`;
    }
  }, []);

  const onKeyUp = useCallback((e) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      if (!e.shiftKey) {
        // 메시지 전송 함수
      }
    }
  }, []);

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
          className="autoTextarea"
          name="message"
          type="text"
          onChange={onChange}
          value={chatInput.message}
          placeholder="메시지를 입력하세요"
          isErr={errorChatInfo.isErr}
          autoFocus
          maxLength={2000}
          onInput={autoResizeTextarea}
          onKeyUp={onKeyUp}
        ></ChatInput>
        <SendMessageButton onChatSubmit={onChatSubmit}></SendMessageButton>
      </ChatInputBox>
    </ChatContentContainer>
  );
};

export default ChatContentBoard;

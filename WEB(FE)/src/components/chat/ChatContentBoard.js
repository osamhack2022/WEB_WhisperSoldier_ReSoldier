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
import { onSnapshot } from "firebase/firestore";
import { dbService, dbFunction } from "../../lib/FStore";

const ChatContentBoard = ({currentChatPair}) => {
  const scrollRef = useRef();
  const [chatInput, onChange] = useForm({ message: "" });
  const [errorChatInfo, setErrorChatInfo] = useState({
    isErr: false,
  });
  const [chats, setChats] = useState([]);
  const { query, collection, orderBy, onSnapshot, where, doc, updateDoc } = dbFunction;
  const getChats = () => {
    
  }
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
    const collectionDirectory = String(`ChatPair/${currentChatPair}/ChatMessage`);
    console.log(collectionDirectory);
    if (currentChatPair !== "") {
      const q = query(collection(dbService, `ChatPair/${currentChatPair}/ChatMessage`),
      orderBy("sent_timestamp", "desc"),
      )
      console.log(currentChatPair);
    //const unsub = onSnapshot(doc(dbService, `ChatPair/${currentChatPair}/ChatMessage`, ), ())
    onSnapshot(q, (snapshot) => {
      const chatsArray = snapshot.docs.map((chats) => ({
        id: chats.id,
        ...chats.data(),
      }));
      console.log("chatsArray: ", chatsArray);
      setChats(chatsArray);
    });
    } else {

    }
    
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

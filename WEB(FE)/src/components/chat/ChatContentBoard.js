import { useAndSetForm } from "../../modules/useForm";
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
import { dbService, dbFunction } from "../../lib/FStore";
import { whisperSodlierSessionKey } from "../../lib/Const";

const ChatContentBoard = ({ currentChatPair, chattingWith }) => {
  const { uid: currentUserUid } = JSON.parse(
    sessionStorage.getItem(whisperSodlierSessionKey)
  );
  const scrollRef = useRef();
  const [chatInput, setInput, onChange] = useAndSetForm({ message: "" });
  const [errorChatInfo, setErrorChatInfo] = useState({
    isErr: false,
  });
  const [chats, setChats] = useState([]);
  const { query, collection, orderBy, onSnapshot, where, updateDoc, doc, serverTimestamp, addDoc, arrayUnion } = dbFunction;
  
  const onChatSubmit = (e) => {
    e.preventDefault();
    if (chatInput.message.length === 0) {
      setErrorChatInfo((prev) => ({ ...prev, isErr: true }));
      setTimeout(() => {
        setErrorChatInfo((prev) => ({ ...prev, isErr: false }));
      }, 3000);
    } else {
      if (currentChatPair !== "") {
        console.log("CurrenChatPair is not empty :) : ", currentChatPair);
        //submit chat to database
        addDoc(collection(dbService, `ChatPair/${currentChatPair}/ChatMessage`), {
          message_text: chatInput.message,
          sent_by: currentUserUid,
          sent_timestamp: serverTimestamp(),
        }).then(console.log("adding successful"));
        //update recentMessage
        updateDoc(doc(dbService, "ChatPair", currentChatPair), {
          recentMessage: {
            message_text: chatInput.message,
            read_by: arrayUnion(currentUserUid), // 반대는 arrayRemove(), 본 사람 추가할때는 중복 추가 없도록 조치할것
            sent_by: currentUserUid,
            sent_timestamp: serverTimestamp(),
          },
        })
        setInput({message: ""});
      } else {
        console.log("You have not selected a user to chat with!")
      }
    }
  };

  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    if (currentChatPair !== "") {
        const q = query(collection(dbService, `ChatPair/${currentChatPair}/ChatMessage`),
          orderBy("sent_timestamp", "asc"),
        )
        console.log("FROM UseEffect: ", currentChatPair);
        const unsub = onSnapshot(q, (snapshot) => {
          const chatsArray = snapshot.docs.map((msg) => ({
            id: msg.id,
            ...msg.data(),
          }));
          console.log("chatsArray: ", chatsArray);
          setChats(chatsArray);
        });
        return () => {
          unsub();
        }
      } else {
        console.log("no selected chat pair")
      }

    
  }, [currentChatPair]);

  return (
    <ChatContentContainer>
      <ChatContentHeaderBox>
        <MyInfoIconBox></MyInfoIconBox>
        <ChatContentText>{chattingWith}</ChatContentText>
      </ChatContentHeaderBox>

      <ChatContentBox ref={scrollRef}>
        {chats.length !== 0 ? (
          chats.map((msg) => (
            <ChatContentElement
              key={msg.id}
              msg={msg}
              isMe={msg.sent_by === currentUserUid}
            ></ChatContentElement>
          ))
        ) : (
          currentChatPair !== "" ? (
            <div>잠시만 기다려 주세요</div>
          ) : (
            <>
              <div>선택된 대화가 없습니다.</div>
              <div>대화 목록을 선택해주세요.</div>
            </>
          )
        )}
        {/* <ChatContentElement></ChatContentElement>
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
        <ChatContentElement></ChatContentElement> */}
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

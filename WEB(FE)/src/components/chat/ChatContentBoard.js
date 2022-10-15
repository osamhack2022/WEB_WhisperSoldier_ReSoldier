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
import { getDoc } from "firebase/firestore";

const ChatContentBoard = ({ currentChatPair, getCurrentChatPair, setCurrentChatPair, chattingWith, setChattingWith }) => {
  const { uid: currentUserUid } = JSON.parse(
    sessionStorage.getItem(whisperSodlierSessionKey)
  );
  const scrollRef = useRef();
  const [chatInput, setInput, onChange] = useAndSetForm({ message: "" });
  const [errorChatInfo, setErrorChatInfo] = useState({
    isErr: false,
  });
  const [chats, setChats] = useState([]);
  const { query, collection, orderBy, onSnapshot, getDocs, deleteDoc, updateDoc, doc, serverTimestamp, addDoc, arrayUnion } = dbFunction;
  
  const onChatPairDeleteClick = async (e) => {
    e.preventDefault();
    const check = window.confirm("정말로 채팅방을 삭제하시겠습니까? 삭제된 데이터는 복구할 수 없습니다.");
    if (check) {
    getCurrentChatPair("", "")
    const chatMessageSnap = await getDocs(query(
        collection(dbService, `ChatPair/${currentChatPair}/ChatMessage`),
      )
    );
    chatMessageSnap.forEach((chatMsgDoc) => {
      deleteDoc(doc(dbService, `ChatPair/${currentChatPair}/ChatMessage`, chatMsgDoc.id));
    })
      await deleteDoc(doc(dbService, "ChatPair", currentChatPair)).then(
        alert("채팅방이 삭제되었습니다.")
      )
      setChats([]);
    }
  }
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
            read_by: [currentUserUid], // 반대는 arrayRemove(), 본 사람 추가할때는 중복 추가 없도록 조치할것
            sent_by: currentUserUid,
            sent_timestamp: serverTimestamp(),
          },
        });
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
        const unsubscribe = onSnapshot(q, (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === ("added" || "modified")) {
              const chatsArray = snapshot.docs.map((msg) => ({
                id: msg.id,
                ...msg.data(),
              }));
              setChats(chatsArray);
              console.log("updating recentMesage");
              updateDoc(doc(dbService, "ChatPair", currentChatPair), {
                "recentMessage.read_by": arrayUnion(currentUserUid), // 반대는 arrayRemove(), 본 사람 추가할때는 중복 추가 없도록 조치할것
              });
            }
            if (change.type === "removed") {
              const chatsArray = snapshot.docs.map((msg) => ({
                id: msg.id,
                ...msg.data(),
              }));
              setChats(chatsArray);
              console.log("updating recentMesage");
              getCurrentChatPair("", "")
            }
          });
        });
        return () => {
          unsubscribe();
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
        <button onClick={onChatPairDeleteClick}>채팅방 삭제하기</button>
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
            <div>아직 채팅이 없습니다. 채팅을 시작해보세요</div>
          ) : (
            <>
              <div>선택된 대화가 없습니다.</div>
              <div>대화 목록을 선택해주세요.</div>
            </>
          )
        )}
        
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

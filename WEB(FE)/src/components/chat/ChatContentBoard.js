import { useAndSetForm } from "../../modules/useForm";
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
import { dbService, dbFunction } from "../../lib/FStore";
import { whisperSodlierSessionKey } from "../../lib/Const";
import { getDoc } from "firebase/firestore";
import styled from "styled-components";
import ChatContentOptionMenu from "./ChatContentOptionMenu";

const ChatCotentBoardBlock = styled.div`
  margin: 10px;
`;

const RightMoreMenuButtonBox = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translate(0, -50%);
`;

const ChatContentBoard = ({
  currentChatPair,
  setCurrentChatPair,
  currentChatWithUser,
  setCurrentChatWithUser,
}) => {
  const { uid: currentUserUid } = JSON.parse(
    sessionStorage.getItem(whisperSodlierSessionKey)
  );
  const scrollRef = useRef();
  const [chatInput, setInput, onChange] = useAndSetForm({ message: "" });
  const [errorChatInfo, setErrorChatInfo] = useState({
    isErr: false,
  });
  const [chats, setChats] = useState([]);
  const {
    query,
    collection,
    orderBy,
    onSnapshot,
    getDocs,
    deleteDoc,
    updateDoc,
    doc,
    serverTimestamp,
    addDoc,
    arrayUnion,
  } = dbFunction;

  const onChatPairDeleteClick = async (e) => {
    e.preventDefault();
    const check = window.confirm(
      "정말로 채팅방을 삭제하시겠습니까? 삭제된 데이터는 복구할 수 없습니다."
    );
    if (check) {
      //getCurrentChatPair("", ""); //과연 이곳에 위치한게 맞을까?
      const chatMessageSnap = await getDocs(
        query(collection(dbService, `ChatPair/${currentChatPair}/ChatMessage`))
      );
      chatMessageSnap.forEach((chatMsgDoc) => {
        deleteDoc(
          doc(
            dbService,
            `ChatPair/${currentChatPair}/ChatMessage`,
            chatMsgDoc.id
          )
        );
      });
      await deleteDoc(doc(dbService, "ChatPair", currentChatPair)).then(
        alert("채팅방이 삭제되었습니다.")
      );
      setChats([]);
      //getCurrentChatPair("", ""); //결국은 이곳에 위치를 해야될듯.... -> 그리고 이 함수를 굳이 여기서 쓸 필요가 없음
      setCurrentChatPair("");
      setCurrentChatWithUser((prev) => ({
        ...prev,
        nickname: "",
        profileImg: "",
      }));
    }
  };
  const onChatSubmit = (e = null) => {
    if (e !== null) {
      e.preventDefault();
    }
    if (chatInput.message.length === 0) {
      setErrorChatInfo((prev) => ({ ...prev, isErr: true }));
      setTimeout(() => {
        setErrorChatInfo((prev) => ({ ...prev, isErr: false }));
      }, 3000);
    } else {
      if (currentChatPair !== "") {
        //submit chat to database
        addDoc(
          collection(dbService, `ChatPair/${currentChatPair}/ChatMessage`),
          {
            message_text: chatInput.message,
            sent_by: currentUserUid,
            sent_timestamp: serverTimestamp(),
          }
        ).then(console.log("adding successful"));
        //update recentMessage
        updateDoc(doc(dbService, "ChatPair", currentChatPair), {
          recentMessage: {
            message_text: chatInput.message,
            read_by: [currentUserUid], // 반대는 arrayRemove(), 본 사람 추가할때는 중복 추가 없도록 조치할것
            sent_by: currentUserUid,
            sent_timestamp: serverTimestamp(),
          },
        });
        setInput({ message: "" });
      } else {
        console.log("You have not selected a user to chat with!");
      }
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

  const onKeyUp = (e) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      if (!e.shiftKey) {
        // 메시지 전송 함수
        onChatSubmit();
        setTimeout(() => {
          autoResizeTextarea();
        }, 5);
      }
    }
  };

  useEffect(() => {
    //scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    setChats([]);
    if (currentChatPair !== "") {
      const q = query(
        collection(dbService, `ChatPair/${currentChatPair}/ChatMessage`),
        orderBy("sent_timestamp", "asc")
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === ("added" || "modified")) {
            const chatsArray = snapshot.docs.map((msg) => ({
              id: msg.id,
              ...msg.data(),
            }));
            setChats(chatsArray);
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
            setCurrentChatPair("");
            setCurrentChatWithUser((prev) => ({
              ...prev,
              nickname: "",
              profileImg: "",
            }));
          }
        });
      });
      return () => {
        unsubscribe();
        // scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      };
    } else {
      console.log("no selected chat pair");
    }
  }, [currentChatPair]);

  useEffect(() => {
    if (currentChatPair !== "") {
      scrollRef.current.scrollIntoView({
        block: "end",
        inline: "nearest",
      });
    }
  }, [chats]);

  return (
    <ChatContentContainer>
      {currentChatPair !== "" ? (
        <>
          <ChatContentHeaderBox>
            <MyInfoIconBox
              myProfileImg={currentChatWithUser.profileImg}
            ></MyInfoIconBox>
            <ChatContentText>{currentChatWithUser.nickname}</ChatContentText>
            <RightMoreMenuButtonBox>
              <ChatContentOptionMenu
                onChatPairDeleteClick={onChatPairDeleteClick}
              />
            </RightMoreMenuButtonBox>
          </ChatContentHeaderBox>
          <ChatContentBox>
            {chats.length !== 0 ? (
              chats.map((msg) => (
                <ChatContentElement
                  key={msg.id}
                  msg={msg}
                  isMe={msg.sent_by === currentUserUid}
                ></ChatContentElement>
              ))
            ) : (
              <div>아직 채팅이 없습니다. 채팅을 시작해보세요</div>
            )}
            <ChatCotentBoardBlock ref={scrollRef} />
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
            <SendMessageButton onChatSubmit={onChatSubmit} />
          </ChatInputBox>
        </>
      ) : (
        <>
          <div>선택된 대화가 없습니다.</div>
          <div>대화 목록을 선택해주세요.</div>
        </>
      )}
    </ChatContentContainer>
  );
};

export default ChatContentBoard;

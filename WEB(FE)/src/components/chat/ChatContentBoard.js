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
  LoadingBox,
  NoSelectBox,
  SendMessageButton,
  StartChatBox,
} from "../../styles/chat/ChatContentBoardStyle";
import { dbService, dbFunction } from "../../lib/FStore";
import { whisperSodlierSessionKey } from "../../lib/Const";
import styled from "styled-components";
import ChatContentOptionMenu from "./ChatContentOptionMenu";
import media from "../../modules/MediaQuery";

const SuccesDeleteInfoTextBox = styled.div`
  position: absolute;
  z-index: 3;
  font-size: 14px;
  text-align: center;
  top: 82px;
  left: 50%;
  transform: translate(-50%, 0);
  padding: 14px 10px 8px 10px;
  border-radius: 5px;
  height: 48px;
  width: fit-content;
  background-color: rgba(166, 86, 70, 10);
  opacity: ${(props) => (props.success ? "0.9" : "0")};
  visibility: ${(props) => (props.success ? "visible" : "hidden")};
  /* display: ${(props) => (props.success ? "block" : "none")}; */
  color: #ffffff;
  transition: all 0.5s;
  ${media.tablet`
    padding: 14px 5px 16px 8px;
    width: 250px;
  `}
  ${media.mobile`
  top : 72px;
  left : 5vw;
  transform: inherit;
  width: 90%;
  `}
`;

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
  setSHowChatContent,
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
  const [firstLoading, setFirstLoading] = useState(true);
  const [successInfo, setSuccessInfo] = useState({
    deleteProcess: false,
    chatWithUserNickname: "",
  });

  const onChatPairDeleteClick = async (e) => {
    e.preventDefault();
    //getCurrentChatPair("", ""); //과연 이곳에 위치한게 맞을까?
    setSuccessInfo((prev) => ({
      ...prev,
      chatWithUserNickname: currentChatWithUser.nickname,
    }));
    const chatMessageSnap = await getDocs(
      query(collection(dbService, `ChatPair/${currentChatPair}/ChatMessage`))
    );
    chatMessageSnap.forEach((chatMsgDoc) => {
      deleteDoc(
        doc(dbService, `ChatPair/${currentChatPair}/ChatMessage`, chatMsgDoc.id)
      );
    });
    await deleteDoc(doc(dbService, "ChatPair", currentChatPair));
    setChats([]);
    //getCurrentChatPair("", ""); //결국은 이곳에 위치를 해야될듯.... -> 그리고 이 함수를 굳이 여기서 쓸 필요가 없음
    setCurrentChatPair("");
    setCurrentChatWithUser((prev) => ({
      ...prev,
      nickname: "",
      profileImg: "",
    }));
    setSHowChatContent(false);
    setSuccessInfo((prev) => ({ ...prev, deleteProcess: true }));
    setTimeout(() => {
      setSuccessInfo((prev) => ({
        ...prev,
        deleteProcess: false,
        chatWithUserNickname: "",
      }));
    }, 3000);
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
              "recentMessage.read_by": arrayUnion(currentUserUid),
              // 반대는 arrayRemove(), 본 사람 추가할때는 중복 추가 없도록 조치할것
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
            setSHowChatContent(false);
          }
        });
        setFirstLoading(false);
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
      <SuccesDeleteInfoTextBox success={successInfo.deleteProcess}>
        {successInfo.chatWithUserNickname}님과의 채팅을 종료했습니다
      </SuccesDeleteInfoTextBox>
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
            {firstLoading ? (
              <LoadingBox />
            ) : chats.length !== 0 ? (
              chats.map((msg) => (
                <ChatContentElement
                  key={msg.id}
                  msg={msg}
                  isMe={msg.sent_by === currentUserUid}
                ></ChatContentElement>
              ))
            ) : (
              <StartChatBox />
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
        <NoSelectBox />
      )}
    </ChatContentContainer>
  );
};

export default ChatContentBoard;

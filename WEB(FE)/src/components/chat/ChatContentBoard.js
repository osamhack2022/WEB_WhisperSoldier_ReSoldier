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
import {
  ChatContentOptionMenu,
  ChatContentOptionMenuBlockByMe,
} from "./ChatContentOptionMenu";

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
  setSuccessInfo,
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
    getDoc,
  } = dbFunction;
  const [firstLoading, setFirstLoading] = useState(true);

  const onChatPairDeleteClick = async (e) => {
    e.preventDefault();
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
    setCurrentChatPair("");
    setCurrentChatWithUser((prev) => ({
      ...prev,
      nickname: "",
      profileImg: "",
      blocked: false,
      blockedByMe: false,
    }));
    setSHowChatContent(false);
    setSuccessInfo((prev) => ({ ...prev, deleteProcess: true }));
    setTimeout(() => {
      setSuccessInfo((prev) => ({
        ...prev,
        deleteProcess: false,
      }));
    }, 3000);
  };

  const onBlockChatPairClick = async (e) => {
    e.preventDefault();

    await updateDoc(doc(dbService, "ChatPair", currentChatPair), {
      is_report_and_block: currentUserUid,
    });
    setCurrentChatWithUser((prev) => ({
      ...prev,
      blocked: true,
      blockedByMe: true,
    }));
    setSuccessInfo((prev) => ({
      ...prev,
      chatWithUserNickname: currentChatWithUser.nickname,
      blockProcess: true,
    }));
    setTimeout(() => {
      setSuccessInfo((prev) => ({
        ...prev,
        blockProcess: false,
      }));
    }, 3000);
  };

  const onUnBlockChatPairClick = async (e) => {
    e.preventDefault();

    await updateDoc(doc(dbService, "ChatPair", currentChatPair), {
      is_report_and_block: "",
    });
    setCurrentChatWithUser((prev) => ({
      ...prev,
      blocked: false,
      blockedByMe: false,
    }));
    setSuccessInfo((prev) => ({
      ...prev,
      chatWithUserNickname: currentChatWithUser.nickname,
      unblockProcess: true,
    }));
    setTimeout(() => {
      setSuccessInfo((prev) => ({
        ...prev,
        unblockProcess: false,
      }));
    }, 3000);
  };

  const onChatSubmit = async (e = null) => {
    if (e !== null) {
      e.preventDefault();
    }
    const chatPairSnap = await getDoc(
      doc(dbService, "ChatPair", currentChatPair)
    );
    if (chatPairSnap.data().is_report_and_block) {
      setCurrentChatWithUser((prev) => ({
        ...prev,
        blocked: true,
        blockedByMe: false,
      }));
      setInput({ message: "" });
      reSizeTextarea();
    } else {
      if (chatInput.message.length === 0 || chatInput.message === "\n") {
        setInput((prev) => ({ ...prev, message: "" }));
        setErrorChatInfo((prev) => ({ ...prev, isErr: true }));
        setTimeout(() => {
          setErrorChatInfo((prev) => ({ ...prev, isErr: false }));
        }, 3000);
      } else {
        if (currentChatPair !== "") {
          addDoc(
            collection(dbService, `ChatPair/${currentChatPair}/ChatMessage`),
            {
              message_text: chatInput.message,
              sent_by: currentUserUid,
              sent_timestamp: serverTimestamp(),
            }
          ).then(console.log("adding successful"));

          updateDoc(doc(dbService, "ChatPair", currentChatPair), {
            recentMessage: {
              message_text: chatInput.message,
              read_by: [currentUserUid],
              sent_by: currentUserUid,
              sent_timestamp: serverTimestamp(),
            },
          });
          setInput({ message: "" });
          reSizeTextarea();
        }
      }
    }
  };

  const autoResizeTextarea = useCallback(() => {
    let textarea = document.querySelector(".autoTextarea");

    if (textarea) {
      textarea.style.height = "38px";
      let height = textarea.scrollHeight; // 높이
      textarea.style.height = `${height}px`;
    }
  }, []);

  const reSizeTextarea = useCallback(() => {
    let textarea = document.querySelector(".autoTextarea");

    if (textarea) {
      textarea.style.height = "38px";
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
      console.log(currentChatWithUser);

      return () => {
        unsubscribe();
      };
    } else {
      console.log("no selected chat pair");
    }
    //eslint-disable-next-line
  }, [currentChatPair]);

  useEffect(() => {
    if (currentChatPair !== "") {
      scrollRef.current.scrollIntoView({
        block: "end",
        inline: "nearest",
      });
    }
    //eslint-disable-next-line
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
              {currentChatWithUser.blocked ? (
                currentChatWithUser.blockedByMe && (
                  <ChatContentOptionMenuBlockByMe
                    onChatPairDeleteClick={onChatPairDeleteClick}
                    onUnBlockChatPairClick={onUnBlockChatPairClick}
                  />
                )
              ) : (
                <ChatContentOptionMenu
                  onChatPairDeleteClick={onChatPairDeleteClick}
                  onBlockChatPairClick={onBlockChatPairClick}
                />
              )}
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
          {!currentChatWithUser.blocked ? (
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
          ) : (
            <ChatInputBox>
              <ChatInput
                className="autoTextarea"
                name="block"
                type="text"
                value=""
                placeholder="차단된 채팅입니다."
                disabled
              ></ChatInput>
              <SendMessageButton blocked="true" />
            </ChatInputBox>
          )}
        </>
      ) : (
        <NoSelectBox />
      )}
    </ChatContentContainer>
  );
};

export default ChatContentBoard;

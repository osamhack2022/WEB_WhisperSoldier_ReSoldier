import { useEffect, useState } from "react";
import ChatPairElement from "./ChatPairElement";
import { dbFunction, dbService } from "../../lib/FStore";
import { whisperSodlierSessionKey } from "../../lib/Const";
import {
  ChatListContainer,
  ChatListTitleBox,
  ChatListTitleText,
  LoadingBox,
  NoChatListBox,
} from "../../styles/chat/ChatPairBoardStyle";

const ChatPairBoard = ({
  toggleShowChatContent,
  setCurrentChatPair,
  setCurrentChatWithUser,
}) => {
  const currentUserInfo = JSON.parse(
    sessionStorage.getItem(whisperSodlierSessionKey)
  );
  const {
    query,
    collection,
    orderBy,
    onSnapshot,
    where,
    doc,
    updateDoc,
    getDoc,
    arrayUnion,
  } = dbFunction;
  const [chatPairs, setChatPairs] = useState([]);
  const [firstLoading, setFirstLoading] = useState(true);

  const getCurrentChatPair = async (pairId, chatWithUser, isBlocked) => {
    setCurrentChatPair(pairId);

    const chatPairSnap = await getDoc(doc(dbService, "ChatPair", pairId));
    const chatPairReadByArray = chatPairSnap.data().recentMessage.read_by;

    if (chatPairReadByArray.includes(currentUserInfo.uid)) {
    } else {
      updateDoc(doc(dbService, "ChatPair", pairId), {
        "recentMessage.read_by": arrayUnion(currentUserInfo.uid),
      });
    }

    if (isBlocked) {
      if (isBlocked === currentUserInfo.uid) {
        setCurrentChatWithUser((prev) => ({
          ...prev,
          nickname: chatWithUser.nickname,
          profileImg: chatWithUser.profileImg,
          blocked: true,
          blockedByMe: true,
        }));
      } else {
        setCurrentChatWithUser((prev) => ({
          ...prev,
          nickname: chatWithUser.nickname,
          profileImg: chatWithUser.profileImg,
          blocked: true,
          blockedByMe: false,
        }));
      }
    } else {
      setCurrentChatWithUser((prev) => ({
        ...prev,
        nickname: chatWithUser.nickname,
        profileImg: chatWithUser.profileImg,
        blocked: false,
        blockedByMe: false,
      }));
    }
  };

  useEffect(() => {
    const chatPairQuery = query(
      collection(dbService, "ChatPair"),
      orderBy("recentMessage.sent_timestamp", "desc"),
      where("member_ids", "array-contains", currentUserInfo.uid)
    );
    const unsubscribe = onSnapshot(chatPairQuery, (snapshot) => {
      const chatPairArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChatPairs(chatPairArray);
      setFirstLoading(false);
    });
    return () => {
      unsubscribe();
    };
    //eslint-disable-next-line
  }, []);

  return (
    <ChatListContainer>
      <ChatListTitleBox>
        <ChatListTitleText>
          {currentUserInfo.providerData[0].displayName}님의 채팅 목록
        </ChatListTitleText>
      </ChatListTitleBox>
      {firstLoading ? (
        <LoadingBox />
      ) : chatPairs.length !== 0 ? (
        chatPairs.map((pair) => (
          <ChatPairElement
            key={pair.id}
            getCurrentChatPair={getCurrentChatPair}
            toggleShowChatContent={toggleShowChatContent}
            pair={pair}
            currentUserUid={currentUserInfo.uid}
            isNewMessage={
              pair.recentMessage.read_by !== undefined
                ? !pair.recentMessage.read_by.includes(currentUserInfo.uid)
                : false
            }
          ></ChatPairElement>
        ))
      ) : (
        <NoChatListBox />
      )}
    </ChatListContainer>
  );
};

export default ChatPairBoard;

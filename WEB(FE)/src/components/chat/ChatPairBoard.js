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

  const getCurrentChatPair = async (pairId, chatWithUser) => {
    setCurrentChatPair(pairId);
    setCurrentChatWithUser((prev) => ({
      ...prev,
      nickname: chatWithUser.nickname,
      profileImg: chatWithUser.profileImg,
    }));

    //chatPair의 recentMessage의 read_by에 arrayUnion으로 내 uid 추가 (만약 기존에 없을 시)
    const chatPairSnap = await getDoc(doc(dbService, "ChatPair", pairId));
    const chatPairReadByArray = chatPairSnap.data().recentMessage.read_by;
    //읽었는지 여부 업데이트
    if (chatPairReadByArray.includes(currentUserInfo.uid)) {
    } else {
      updateDoc(doc(dbService, "ChatPair", pairId), {
        "recentMessage.read_by": arrayUnion(currentUserInfo.uid),
      });
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
            //onClick={() => getCurrentChatPair(pair.id, pair.members, currentUserUid)}
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

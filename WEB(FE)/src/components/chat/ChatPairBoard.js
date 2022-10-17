import { useEffect, useState } from "react";
import ChatPairElement from "./ChatPairElement";
import { dbFunction, dbService } from "../../lib/FStore";
import { whisperSodlierSessionKey } from "../../lib/Const";
import styled from "styled-components";
import media from "../../modules/MediaQuery";

const ChatListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: fit-content;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
  width: 300px;
  ${media.tablet`
  width:50%;`}
  ${media.mobile`
  width: 100%;
  `}
`;

const ChatListTitleBox = styled.div`
  margin: 0px 0px 10px 0px;
  padding: 10px;
  height: fit-content;
  border-bottom: 1px solid rgb(189, 189, 189);
  width: 100%;
`;

const ChatListTitleText = styled.div`
  font-size: 16px;
  text-align: center;
  font-weight: 600;
  line-height: 1.2;
`;

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
        "recentMessage.read_by": arrayUnion(currentUserInfo.uid), // 반대는 arrayRemove(), 본 사람 추가할때는 중복 추가 없도록 조치할것
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
      {chatPairs.length !== 0 ? (
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
        <div>잠시만 기다려 주세요</div>
      )}
    </ChatListContainer>
  );
};

export default ChatPairBoard;

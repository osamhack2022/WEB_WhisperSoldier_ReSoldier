import { useState } from "react";
import styled from "styled-components";
import ChatContentBoard from "../components/chat/ChatContentBoard";
import ChatPairBoard from "../components/chat/ChatPairBoard";
import { whisperSodlierSessionKey } from "../lib/Const";
import { dbService, dbFunction } from "../lib/FStore";
import media from "../modules/MediaQuery";

const ChatContainer = styled.div`
  margin: 0px auto;
  width: 960px;
  display: flex;
  flex-direction: row;
  ${media.smallDesktop`
    margin: inherit;
    width: inherit;
    padding: 0px 10vw;
  `}
  ${media.mobile`
  flex-direction:column;
    padding: 0px 5vw;
  `}
`;

const ChatPage = () => {
  const [currentChatPair, setCurrentChatPair] = useState("");
  const [chattingWith, setChattingWith] = useState("");
  const { query, collection, getDoc, onSnapshot, where, updateDoc, doc, serverTimestamp, addDoc, arrayUnion } = dbFunction;

  const getCurrentChatPair = async (pairId, members) => {
    const { uid: currentUserUid } = JSON.parse(
      sessionStorage.getItem(whisperSodlierSessionKey)
    );
    console.log("pairId: ", pairId);
    setCurrentChatPair(pairId);
    //chatPair의 recentMessage의 read_by에 arrayUnion으로 내 uid 추가 (만약 기존에 없을 시)
    if (pairId !== "") {const chatPairSnap = await getDoc(doc(dbService, "ChatPair", pairId));
    const chatPairReadByArray = chatPairSnap.data().recentMessage.read_by
    console.log("chatPairReadByArray: ", chatPairReadByArray)
    //읽었는지 여부 업데이트
    if (chatPairReadByArray.includes(currentUserUid)) {
      console.log("already read");
    } else {
      console.log("updating recentMesage");
      updateDoc(doc(dbService, "ChatPair", pairId), {
        "recentMessage.read_by": arrayUnion(currentUserUid), // 반대는 arrayRemove(), 본 사람 추가할때는 중복 추가 없도록 조치할것
      });
    }}
    if (members !== "") {
      console.log("Members: ", members);
      (currentUserUid === members[0].member_id ? (
        setChattingWith(members[1].member_displayname)
      ) : (
        (currentUserUid === members[1].member_id) ? (
          setChattingWith(members[0].member_displayname)
        ) : console.log("오류입니다")))
    } else {
      setChattingWith("");
    }
  }
  return (
    <ChatContainer>
      <ChatPairBoard
        getCurrentChatPair={getCurrentChatPair}
        setCurrentChatPair={setCurrentChatPair}
        currentChatPair={currentChatPair}
      ></ChatPairBoard>
      <ChatContentBoard
        currentChatPair={currentChatPair}
        getCurrentChatPair={getCurrentChatPair}
        setCurrentChatPair={setCurrentChatPair}
        chattingWith={chattingWith}
        setChattingWith={setChattingWith}
      ></ChatContentBoard>
    </ChatContainer>
  );
};

export default ChatPage;

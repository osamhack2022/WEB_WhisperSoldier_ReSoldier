import { useState } from "react";
import styled from "styled-components";
import ChatContentBoard from "../components/chat/ChatContentBoard";
import ChatPairBoard from "../components/chat/ChatPairBoard";
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
  const getCurrentChatPair = (pairId, members, myUid) => {
    console.log("pairId: ", pairId);
    setCurrentChatPair(pairId);
    console.log("Members: ", members);
    (myUid === members[0].member_id ? (
        setChattingWith(members[1].member_displayname)
    ) : (
      (myUid === members[1].member_id) ? (
    setChattingWith(members[0].member_displayname)
      ) : console.log("오류입니다")))  
  }
  return (
    <ChatContainer>
      <ChatPairBoard
        getCurrentChatPair={getCurrentChatPair}
        setCurrentChatPair={setCurrentChatPair}
      ></ChatPairBoard>
      <ChatContentBoard
        currentChatPair={currentChatPair}
        chattingWith={chattingWith}
      ></ChatContentBoard>
    </ChatContainer>
  );
};

export default ChatPage;

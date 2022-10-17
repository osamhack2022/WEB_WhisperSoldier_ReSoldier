import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import ChatContentBoard from "../components/chat/ChatContentBoard";
import ChatPairBoard from "../components/chat/ChatPairBoard";
import { BackButton } from "../components/common/Buttons";
import SideButtonBox from "../components/common/SideButtonBox";
import { TabletQuery } from "../lib/Const";
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
  const isTablet = useMediaQuery({ query: TabletQuery });
  const [showChatContent, setSHowChatContent] = useState(false);

  const toggleShowChatContent = () => {
    setSHowChatContent(!showChatContent);
  };

  const [currentChatPair, setCurrentChatPair] = useState("");
  const [currentChatWithUser, setCurrentChatWithUser] = useState({
    nickname: "",
    profileImg: "",
  });
  //const [chattingWith, setChattingWith] = useState("");

  return (
    <ChatContainer>
      {(isTablet || !showChatContent) && (
        <ChatPairBoard
          toggleShowChatContent={toggleShowChatContent}
          setCurrentChatPair={setCurrentChatPair}
          setCurrentChatWithUser={setCurrentChatWithUser}
        ></ChatPairBoard>
      )}
      {!isTablet && showChatContent && (
        <SideButtonBox>
          <BackButton
            goBack={toggleShowChatContent}
            isMobile={!isTablet}
            notRight={true}
          >
            뒤로가기
          </BackButton>
        </SideButtonBox>
      )}
      {(isTablet || showChatContent) && (
        <ChatContentBoard
          currentChatPair={currentChatPair}
          setCurrentChatPair={setCurrentChatPair}
          currentChatWithUser={currentChatWithUser}
          setCurrentChatWithUser={setCurrentChatWithUser}
        ></ChatContentBoard>
      )}
    </ChatContainer>
  );
};

export default ChatPage;

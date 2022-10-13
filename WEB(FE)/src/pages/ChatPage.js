import styled from "styled-components";
import ChatContent from "../components/chat/ChatContentBoard";
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
  return (
    <ChatContainer>
      <ChatPairBoard></ChatPairBoard>
      <ChatContent></ChatContent>
    </ChatContainer>
  );
};

export default ChatPage;

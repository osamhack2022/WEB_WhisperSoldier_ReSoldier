import { Link } from "react-router-dom";
import ChatContent from "../components/chat/ChatContentBoard"
import ChatPairBoard from "../components/chat/ChatPairBoard"

const ChatPage = () => {
  return (
    <div>
      <div>채팅 페이지</div>
      <hr />
      <ChatPairBoard></ChatPairBoard>
      <hr />
      <ChatContent></ChatContent>
      <hr />
      <br />
      <Link to="/">홈페이지</Link>
    </div>
  );
};

export default ChatPage;

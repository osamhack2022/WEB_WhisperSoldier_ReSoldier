import styled from "styled-components";

const ChatContentElementBlock = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: ${(props) => (props.me ? "end" : "start")};
`;

const ChatContentElementBox = styled.div`
  width: fit-content;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  transition: all 0.5s;
  background-color: ${(props) => (props.me ? "#83C982" : "#DCDCDC")};
`;

const ChatContentText = styled.div`
  padding: 10px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.2;
`;

const ChatContentElement = ({ isMe }) => {
  return (
    <ChatContentElementBlock me={isMe}>
      <ChatContentElementBox me={isMe}>
        <ChatContentText>채팅 하나하나</ChatContentText>
      </ChatContentElementBox>
    </ChatContentElementBlock>
  );
};

export default ChatContentElement;

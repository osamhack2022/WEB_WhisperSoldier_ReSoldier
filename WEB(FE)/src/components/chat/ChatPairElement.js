import { useState } from "react";
import styled from "styled-components";

const ChatParitElementBox = styled.div`
margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: ${(props) => (props.me ? "end" : "start")};`;

const ChatPairElement = () => {
  return (
    <ChatParitElementBox>
      <div>채팅방 하나하나</div>
    </ChatParitElementBox>
  );
};

export default ChatPairElement;

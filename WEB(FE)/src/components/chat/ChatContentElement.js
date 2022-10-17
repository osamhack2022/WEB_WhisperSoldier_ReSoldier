import styled, { css } from "styled-components";

const ChatContentElementBlock = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: ${(props) => (props.me ? "end" : "start")};
`;

const ChatContentElementBox = styled.div`
  width: fit-content;
  height: 36px;
  padding: 5px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  transition: all 0.5s;
  //background-color: ${(props) => (props.me ? "#83C982" : "#DCDCDC")};
  background-color: ${(props) => (props.me ? "#94DA89" : "#DCDCDC")};
  ${(props) =>
    props.me
      ? css`
          &::after,
          ::before {
            left: 96%;
            top: 50%;
            border: solid transparent;
            content: "";
            height: 0;
            width: 0;
            position: absolute;
            pointer-events: none;
          }

          &::after {
            border-color: rgba(136, 183, 213, 0);
            border-left-color: #94da89;
            border-width: 10px;
            margin-top: -10px;
          }
          &::before {
            border-color: rgba(0, 0, 0, 0);
            border-width: 10px;
            margin-top: -21px;
          }
        `
      : css`
          &::after,
          ::before {
            right: 96%;
            top: 50%;
            border: solid transparent;
            content: "";
            height: 0;
            width: 0;
            position: absolute;
            pointer-events: none;
          }

          &::after {
            border-color: rgba(136, 183, 213, 0);
            border-right-color: #dcdcdc;
            border-width: 10px;
            margin-top: -10px;
          }
          &::before {
            border-color: rgba(0, 0, 0, 0);
            border-width: 10px;
            margin-top: -21px;
          }
        `};
`;

const ChatContentText = styled.div`
  padding: 10px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.2;
  white-space: pre-wrap;
`;

const ChatContentElement = ({ msg, isMe }) => {
  return (
    <ChatContentElementBlock me={isMe}>
      <ChatContentElementBox me={isMe}>
        <ChatContentText>{msg.message_text}</ChatContentText>
      </ChatContentElementBox>
    </ChatContentElementBlock>
  );
};

export default ChatContentElement;

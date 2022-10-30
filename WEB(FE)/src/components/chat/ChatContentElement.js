import styled, { css } from "styled-components";

const ChatContentElementBlock = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: ${(props) => (props.me ? "end" : "start")};
`;

const ChatContentElementBox = styled.div`
  width: fit-content;
  max-width: 320px;
  height: fit-content;
  padding: 0px 5px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  transition: all 0.5s;
  background-color: ${(props) => (props.me ? "#B2D299" : "#DCDCDC")};

  ${(props) =>
    props.me
      ? css`
          &::after,
          ::before {
            border: solid transparent;
            content: "";
            height: 0;
            width: 0;
            position: absolute;
            pointer-events: none;
            right: -15px;
            top: 50%;
            transform: translate(0, -50%);
          }

          &::after {
            border-left-color: #b2d299;
            border-width: 10px;
          }
        `
      : css`
          &::after,
          ::before {
            left: -15px;
            top: 50%;
            border: solid transparent;
            content: "";
            height: 0;
            width: 0;
            position: absolute;
            pointer-events: none;
            transform: translate(0, -50%);
          }

          &::after {
            border-color: rgba(136, 183, 213, 0);
            border-right-color: #dcdcdc;
            border-width: 10px;
          }
        `};
`;

const ChatContentText = styled.div`
  padding: 10px;
  font-size: 14px;
  font-weight: 400;
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

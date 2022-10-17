import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import media from "../../modules/MediaQuery";
import { SkyBlue } from "../../styles/Color";
import { BorderBottomOnePx } from "../../styles/Component";
import calTimeToString from "../../modules/CalTime";

const ChatParitElementBox = styled.div`
  position: relative;
  margin-top: 10px;
  width: 90%;
  padding-bottom: ${(props) => (!props.isLast ? "10px" : "20px")};
  display: flex;
  align-items: center;
  border-bottom: ${(props) => !props.isLast && BorderBottomOnePx};
`;

const MyInfoIcon = styled(FaUserCircle)`
  height: 40px;
  width: 40px;
  color: #555555;
`;

const MyInfoIconBoxStyle = styled.div`
  margin-right: 10px;
  height: fit-content;
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const IsNewMesssageIcon = styled.div`
  height: 9px;
  width: 9px;
  margin-right: 10px;
  border-radius: 50%;
  margin-right: 3px;
  background-color: ${SkyBlue};
  visibility: ${(props) => (props.isNewMessage ? "visible" : "hidden")};
  transition: all 0.5s;
`;

const ChatInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
`;

const ChatInfoTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

const ChatInfoContent = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

const ChatTimeInfo = styled.div`
  position: absolute;
  top: 2px;
  right: 10px;
  font-size: 12px;
  text-align: left;
  letter-spacing: 0.48px;
  color: #bdbdbd;
  font-weight: 400;
`;

const MyInfoIconBox = ({ isNewMessage }) => {
  return (
    <MyInfoIconBoxStyle>
      <IsNewMesssageIcon isNewMessage={isNewMessage}></IsNewMesssageIcon>
      <MyInfoIcon></MyInfoIcon>
    </MyInfoIconBoxStyle>
  );
};

const ChatPairElement = ({
  isNewMessage,
  isNewMessageTest,
  getCurrentChatPair,
  pair,
  currentUserUid,
  //index,
  isLast,
  toggleShowChatContent,
}) => {
  console.log("isNewMessageTest: ", isNewMessageTest);
  // useEffect(()=>{
  //   const UserDoc =
  // },[]);

  const clickChatPairBox = () => {
    getCurrentChatPair(pair.id, pair.members);
    toggleShowChatContent();
  };
  return (
    <ChatParitElementBox onClick={clickChatPairBox} isLast={isLast}>
      <MyInfoIconBox isNewMessage={isNewMessage}></MyInfoIconBox>
      <ChatInfoBox>
        <ChatInfoTitle>
          {/* {index === 0 ? "[최신] " : ""} */}
          {currentUserUid === pair.members[0].member_id
            ? pair.members[1].member_displayname
            : currentUserUid === pair.members[1].member_id
            ? pair.members[0].member_displayname
            : "오류입니다"}
        </ChatInfoTitle>
        <ChatInfoContent>{pair.recentMessage.message_text}</ChatInfoContent>
      </ChatInfoBox>
      <ChatTimeInfo>
        {calTimeToString(pair.recentMessage.sent_timestamp)}
      </ChatTimeInfo>
    </ChatParitElementBox>
  );
};

export default ChatPairElement;

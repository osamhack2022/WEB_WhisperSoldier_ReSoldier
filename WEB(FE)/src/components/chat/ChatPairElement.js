import { useEffect, useState } from "react";

import calTimeToString from "../../modules/CalTime";
import { dbFunction, dbService } from "../../lib/FStore";
import {
  ChatInfoBox,
  ChatInfoContent,
  ChatInfoTitle,
  ChatParitElementBox,
  ChatTimeInfo,
  IsNewMesssageIcon,
  MyInfoIcon,
  MyInfoIconBoxStyle,
} from "../../styles/chat/ChatPairElementStyle";
import { Avatar } from "@mui/material";

const MyInfoIconBox = ({ isNewMessage, userProfileImg }) => {
  return (
    <MyInfoIconBoxStyle>
      <IsNewMesssageIcon isNewMessage={isNewMessage}></IsNewMesssageIcon>
      {userProfileImg ? (
        <Avatar
          alt="userImg"
          src={userProfileImg}
          sx={{ width: 40, height: 40 }}
        />
      ) : (
        <MyInfoIcon></MyInfoIcon>
      )}
    </MyInfoIconBoxStyle>
  );
};

const ChatPairElement = ({
  isNewMessage,
  getCurrentChatPair,
  pair,
  currentUserUid,
  isLast,
  toggleShowChatContent,
}) => {
  const [chatWithUser, setChatWithUser] = useState({
    nickname: "",
    profileImg: "",
  });

  const { doc, getDoc } = dbFunction;

  const clickChatPairBox = () => {
    getCurrentChatPair(pair.id, chatWithUser);
    toggleShowChatContent();
  };

  const getChatWithUserInfo = async () => {
    let chatWithUserDoc;
    if (currentUserUid !== pair.member_ids[0]) {
      chatWithUserDoc = await getDoc(
        doc(dbService, "User", pair.member_ids[0])
      );
    } else {
      chatWithUserDoc = await getDoc(
        doc(dbService, "User", pair.member_ids[1])
      );
    }

    if (chatWithUserDoc.data()) {
      setChatWithUser((prev) => ({
        ...prev,
        nickname: chatWithUserDoc.data().nickname,
        profileImg: chatWithUserDoc.data().profileImg,
      }));
    } else {
      setChatWithUser((prev) => ({
        ...prev,
        nickname: "알 수 없는 사용자",
        profileImg: "",
      }));
    }
  };

  useEffect(() => {
    getChatWithUserInfo();
  }, []);

  return (
    <ChatParitElementBox onClick={clickChatPairBox} isLast={isLast}>
      <MyInfoIconBox
        isNewMessage={isNewMessage}
        userProfileImg={chatWithUser.profileImg}
      ></MyInfoIconBox>
      <ChatInfoBox>
        <ChatInfoTitle>{chatWithUser.nickname}</ChatInfoTitle>
        <ChatInfoContent>{pair.recentMessage.message_text}</ChatInfoContent>
      </ChatInfoBox>
      <ChatTimeInfo>
        {calTimeToString(pair.recentMessage.sent_timestamp)}
      </ChatTimeInfo>
    </ChatParitElementBox>
  );
};

export default ChatPairElement;

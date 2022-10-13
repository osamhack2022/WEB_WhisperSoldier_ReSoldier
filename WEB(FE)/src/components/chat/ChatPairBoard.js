import { useEffect, useState } from "react";
import ChatPairElement from "./ChatPairElement";
import { dbFunction, dbService } from "../../lib/FStore";
import { whisperSodlierSessionKey } from "../../lib/Const";
import styled from "styled-components";
import media from "../../modules/MediaQuery";

const ChatListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: fit-content;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
  width: 300px;
  ${media.tablet`
  width:50%;`
  }
  ${media.mobile`
  width: 100%;
  `}
`;

const ChatListTitleBox = styled.div`
  margin : 0px 0px 10px 0px;
  padding : 10px;
  height: fit-content;
  border-bottom: 1px solid rgb(189, 189, 189);
  width: 100%;
`;

const ChatListTitleText = styled.div`
  font-size: 16px;
  text-align : center;
  font-weight: 600;
  line-height: 1.2;
`;

const ChatPairBoard = () => {
  const { uid: currentUserUid } = JSON.parse(
    sessionStorage.getItem(whisperSodlierSessionKey)
  );
  const { query, collection, orderBy, onSnapshot, where } = dbFunction;
  const [chatPairs, setChatPairs] = useState([]);
  console.log("currentUserUid: ", currentUserUid);
  useEffect(() => {
    const q = query(
      collection(dbService, "ChatPair"),
      where("member_ids", "array-contains", currentUserUid),
      orderBy("recentMessage.sent_timestamp", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const chatPairArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("chatPairArray: ", chatPairArray);
      setChatPairs(chatPairArray);
    });
  }, []);
  return (
    <ChatListContainer>
      <ChatListTitleBox>
      <ChatListTitleText>{"내 채팅(가칭) 리스트"}</ChatListTitleText>
      </ChatListTitleBox>
      
      {chatPairs.length !== 0 ? (
        chatPairs.map((pair, index) => (
          <div key={pair.id}>
            익명 {index === 0 ? ", 최신 채팅입니다   " : ""}
            {/* 이 부분은 닉네임 넣으면 할 것...! */}
            {/* {currentUserUid === pair.members[0].member_id ? (
										pair.members[1].member_displayname
									) : (
										(currentUserUid === pair.members[1].member_id) ? (pair.members[0].member_displayname) : "오류입니다")} */}
          </div>
        ))
      ) : (
        <div>잠시만 기다려 주세요</div>
      )}

      <ChatPairElement></ChatPairElement>
      <ChatPairElement></ChatPairElement>
      <ChatPairElement></ChatPairElement>
      <ChatPairElement></ChatPairElement>
      <ChatPairElement></ChatPairElement>
      <ChatPairElement></ChatPairElement>
      <ChatPairElement></ChatPairElement>
      <ChatPairElement></ChatPairElement>
    </ChatListContainer>
  );
};

export default ChatPairBoard;

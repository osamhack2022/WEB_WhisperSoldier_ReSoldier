import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useMediaQuery } from "react-responsive";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import ChatContentBoard from "../components/chat/ChatContentBoard";
import ChatPairBoard from "../components/chat/ChatPairBoard";
import { ChatPageAlert } from "../components/common/Alert";
import { BackButton } from "../components/common/Buttons";
import SideButtonBox from "../components/common/SideButtonBox";
import { TabletQuery, whisperSodlierSessionKey } from "../lib/Const";
import { dbService } from "../lib/FStore";
import media from "../modules/MediaQuery";
import { StartFirstChat } from "../store/ChatStore";

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
  const currentUserInfo = JSON.parse(
    sessionStorage.getItem(whisperSodlierSessionKey)
  );

  const isTablet = useMediaQuery({ query: TabletQuery });
  const [showChatContent, setSHowChatContent] = useState(false);
  const [startFirstChat, setStartFirstChat] = useRecoilState(StartFirstChat);

  const toggleShowChatContent = () => {
    setSHowChatContent(!showChatContent);
  };

  const [currentChatPair, setCurrentChatPair] = useState("");
  const [currentChatWithUser, setCurrentChatWithUser] = useState({
    nickname: "",
    profileImg: "",
    blocked: false,
    blockedByMe: false,
  });

  const [successInfo, setSuccessInfo] = useState({
    deleteProcess: false,
    blockProcess: false,
    unblockProcess: false,
    chatWithUserNickname: "",
  });

  const startChat = async () => {
    setCurrentChatPair(startFirstChat.docUID);
    const startChatDoc = await getDoc(
      doc(dbService, "ChatPair", startFirstChat.docUID)
    );

    const startChatInfo = startChatDoc.data();

    let chatWithUserDoc;
    if (currentUserInfo.uid !== startChatInfo.member_ids[0]) {
      chatWithUserDoc = await getDoc(
        doc(dbService, "User", startChatInfo.member_ids[0])
      );
    } else {
      chatWithUserDoc = await getDoc(
        doc(dbService, "User", startChatInfo.member_ids[1])
      );
    }

    if (chatWithUserDoc.data()) {
      setCurrentChatWithUser((prev) => ({
        ...prev,
        nickname: chatWithUserDoc.data().nickname,
        profileImg: chatWithUserDoc.data().profileImg,
      }));
    } else {
      setCurrentChatWithUser((prev) => ({
        ...prev,
        nickname: "알 수 없는 사용자",
        profileImg: "",
      }));
    }
  };

  useEffect(() => {
    if (startFirstChat.exist) {
      startChat();
      setSHowChatContent(true);
      setStartFirstChat((prev) => ({ ...prev, exist: false, docUID: "" }));
    }
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <Helmet>
        <title>채팅 - Whisper Soldier</title>
      </Helmet>
      <ChatContainer>
        <ChatPageAlert successInfo={successInfo} />
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
            setSHowChatContent={setSHowChatContent}
            setSuccessInfo={setSuccessInfo}
          ></ChatContentBoard>
        )}
      </ChatContainer>
    </>
  );
};

export default ChatPage;

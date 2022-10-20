import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import ChatContentBoard from "../components/chat/ChatContentBoard";
import ChatPairBoard from "../components/chat/ChatPairBoard";
import { BackButton } from "../components/common/Buttons";
import SideButtonBox from "../components/common/SideButtonBox";
import { TabletQuery, whisperSodlierSessionKey } from "../lib/Const";
import { dbService } from "../lib/FStore";
import media from "../modules/MediaQuery";
import { StartFirstChat } from "../store/ChatStore";

const SuccesDeleteInfoTextBox = styled.div`
  position: absolute;
  z-index: 2;
  font-size: 14px;
  text-align: center;
  top: 82px;
  left: 50%;
  transform: translate(-50%, 0);
  padding: 14px 10px 8px 10px;
  border-radius: 5px;
  height: 48px;
  width: fit-content;
  background-color: rgba(166, 86, 70, 10);
  opacity: ${(props) => (props.success ? "0.9" : "0")};
  visibility: ${(props) => (props.success ? "visible" : "hidden")};
  /* display: ${(props) => (props.success ? "block" : "none")}; */
  color: #ffffff;
  transition: all 0.5s;
  ${media.tablet`
    padding: 14px 5px 16px 8px;
    width: 250px;
  `}
  ${media.mobile`
  top : 72px;
  left : 5vw;
  transform: inherit;
  width: 90%;
  `}
`;

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
    console.log(startFirstChat);
    if (startFirstChat.exist) {
      startChat();
      setSHowChatContent(true);
      setStartFirstChat((prev) => ({ ...prev, exist: false, docUID: "" }));
    }
    //eslint-disable-next-line
  }, []);

  return (
    <ChatContainer>
      <SuccesDeleteInfoTextBox success={successInfo.deleteProcess}>
        {successInfo.chatWithUserNickname}님과의 채팅을 종료했습니다
      </SuccesDeleteInfoTextBox>
      <SuccesDeleteInfoTextBox success={successInfo.blockProcess}>
        {successInfo.chatWithUserNickname}님과의 채팅을 차단했습니다
      </SuccesDeleteInfoTextBox>
      <SuccesDeleteInfoTextBox success={successInfo.unblockProcess}>
        {successInfo.chatWithUserNickname}님과의 채팅을 차단해제했습니다
      </SuccesDeleteInfoTextBox>
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
  );
};

export default ChatPage;

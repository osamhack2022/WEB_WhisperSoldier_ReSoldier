import React, { useEffect, useState } from "react";
import ChatPairElement from "./ChatPairElement";
import { dbFunction, dbService } from "../../lib/FStore";
import { whisperSodlierSessionKey } from "../../lib/Const";

const ChatPairBoard = () => {
	const { uid: currentUserUid } = JSON.parse(
		sessionStorage.getItem(whisperSodlierSessionKey)
	);
  const { getDocs, query, collection, orderBy, onSnapshot, where } = dbFunction;

	const getChatPairs = () => {

	}
	const [chatPairs, setChatPairs] = useState([]);
	console.log("currentUserUid: ", currentUserUid)
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
		console.log("chatPairArray: ", chatPairArray)
		setChatPairs(chatPairArray);
		});
		}, []);
    return (
			<>
				<div>채팅방 목록</div>
				{chatPairs.length !== 0 ? (
              chatPairs.map((pair, index) => (
								<div key={pair.id}>
									익명 {index === 0 ? ", 최신 채팅입니다" : ""}
									{/* 이 부분은 닉네임 넣으면 할 것...! 아마 채팅방 생성 기능 할때 할거같음  */}
									{currentUserUid === pair.members[0].member_id ? (
										pair.members[1].member_displayname
									) : (
										(currentUserUid === pair.members[1].member_id) ? (pair.members[0].member_displayname) : "오류입니다")}
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
			</>
    )
}

export default ChatPairBoard;
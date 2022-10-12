import React from "react";
import ChatPairElement from "./ChatPairElement";
import { dbFunction } from "../../lib/FStore";

const ChatPairBoard = () => {
    const { getDocs } = dbFunction;



    return (
			<>
				<div>채팅방 목록</div>
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
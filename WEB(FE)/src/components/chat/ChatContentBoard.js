import React, { useState } from "react";
import ChatContentElement from "./ChatContentElement";

const ChatContentBoard = () => {
	const [chatInput, setChatInput] = useState("");

	const onChange = (e) => {
		const { target: { value } } = e
		setChatInput(value);
	}
	const onChatSubmit = (e) => {
		e.preventDefault();
		//submit chat to database
	}
	return (
		<>
			<div>채팅하는사람 (익명1, 익명2 등등)</div>
			<div>원본 고민 글</div>
			<ChatContentElement></ChatContentElement>
			<ChatContentElement></ChatContentElement>
			<ChatContentElement></ChatContentElement>
			<ChatContentElement></ChatContentElement>
			<form>
				<input onChange={onChange} value={chatInput}></input>
				<button onClick={onChatSubmit}>전송하기</button>
			</form>
		</>
	)
}

export default ChatContentBoard;
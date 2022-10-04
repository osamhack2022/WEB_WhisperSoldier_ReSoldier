import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { dbService } from "../../lib/FStore";

const PostCommentElement = ({
	commentElement,
	isOwner,
	getPostComments,
}) => {

	const onDeleteCommentClick = async () => {
		const check = window.confirm("정말로 댓글을 삭제하시겠습니까?");
		if (check) {
			console.log(`deleting ${commentElement.id}`);
			await deleteDoc(doc(dbService, "Comment", commentElement.id)).then(
				alert("댓글이 삭제되었습니다.")
			);
			getPostComments(false, true);
			// 댓글창 업데이트
		}
	};

	return (
		<div style={{ whiteSpace: "pre-wrap" }}>
			{commentElement.comment_text}
			{isOwner && (
				<>
					<button>수정하기</button>
					<button onClick={onDeleteCommentClick}>삭제하기</button>
				</>
			)}
			<hr />
		</div>
	)
}

export default PostCommentElement;
import { useState } from "react";
import { dbService, dbFunction } from "../../lib/FStore";


const PostCommentElement =({commentElement,
    isOwner,
    getPostComments})=>{
        const {deleteDoc, updateDoc, doc} = dbFunction;
        const [isEditingComment, setIsEditingComment] = useState(false);
        const [newComment, setNewComment] = useState(commentElement.comment_text);
        const onDeleteCommentClick = async () => {
            const check = window.confirm("정말로 댓글을 삭제하시겠습니까?");
            if (check) {
                console.log(`deleting ${commentElement.id}`);
                await deleteDoc(doc(dbService, "Comment", commentElement.id)).then(
                    alert("댓글이 삭제되었습니다.")
                );
                getPostComments(false, true);
                // 댓글창 업데이트 (isAddingComments = false, isDeletingComments = true)
            }
        };
    
        const toggleCommentEditing = () => setIsEditingComment((prev) => !prev);
        
        const onCommentEditAndSubmit = async (e) => {
            e.preventDefault();
            const check = window.confirm("정말로 댓글을 수정하시겠습니까?");
            if (check) {
                await updateDoc(doc(dbService, "Comment", commentElement.id),
                    {
                        comment_text: newComment
                    }
                ).then(alert("댓글을 수정하였습니다."))
                setIsEditingComment(false);
                getPostComments(false, true);
            }
            
        }
    
        const onCommentChange = (e) => {
            const {
                target: { value },
            } = e;
            setNewComment(value);
        }
    
        return (
            <div>
                {isEditingComment ? (
                    <>
                        <form onSubmit={onCommentEditAndSubmit}>
                            <textarea
                                style={{ whiteSpace: "pre-wrap" }}
                                value={newComment}
                                onChange={onCommentChange}
                            />
                            <button type="submit">댓글 수정</button>
                        </form>
                        <button onClick={toggleCommentEditing}>수정 취소</button>
                    </>
                ) : (
                    <div style={{ whiteSpace: "pre-wrap" }}>
                        {commentElement.comment_text}
                        {isOwner && (
                            <>
                                <button onClick={toggleCommentEditing}>수정하기</button>
                                <button onClick={onDeleteCommentClick}>삭제하기</button>
                            </>
                        )}
                        <hr />
                    </div>
                )}
            </div>
        )
}

export default PostCommentElement;
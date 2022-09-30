import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// 추후에 편집, 삭제 구현 시 authService.currentUser.uid === contentObj.creator_id 비교 목적
import { authService } from "../lib/FAuth";
import { dbService } from "../lib/FStore";
import { doc, getDoc } from "firebase/firestore";


const PostPage = () => {
    const { id } = useParams();
    const [content, setContent] = useState({});
    const [isContentError, setIsContentError] = useState(false);
    // 추후 댓글 구현을 위한 포석
    const [postComment, setPostComment] = useState("");

    const onSubmitComment = async (e) => {
        e.preventDefault();
        // 추후 댓글 구현 예정
    }
    const onCommentChange = (e) => {
        const {
            target: { name, value }
        } = e;
        
        if (name === "comment") {
            setPostComment(value);
        }
    }
    
    const getContent = async () => {
        const docRef = doc(dbService, "WorryPost", id);
        const docSnapShot = await getDoc(docRef);
        if (docSnapShot.exists()) {
            //console.log("Doc Data: ", docSnapShot.data());
            const contentObj = {
                ...docSnapShot.data(),
                id
            }
            setContent(contentObj);
            //console.log("time: ", contentObj.created_timestamp.toDate());
        } else {
            setIsContentError(true);
            console.log("No such Document!");
        }
    }

    useEffect(() => {
        getContent();
    }, [])
    
    return (
        <>
        {isContentError ? 
            (<b>존재하지 않는 포스트입니다.</b>
            ) : (
                <>
                    <div>포스트 페이지 for 문서 ID: {id}</div>
                    <hr />
                    <div class="postInfo">
                        <img width="30px" src="https://previews.123rf.com/images/salamatik/salamatik1801/salamatik180100019/92979836-%ED%94%84%EB%A1%9C%ED%95%84-%EC%9D%B5%EB%AA%85%EC%9D%98-%EC%96%BC%EA%B5%B4-%EC%95%84%EC%9D%B4%EC%BD%98-%ED%9A%8C%EC%83%89-%EC%8B%A4%EB%A3%A8%EC%97%A3-%EC%82%AC%EB%9E%8C%EC%9E%85%EB%8B%88%EB%8B%A4-%EB%82%A8%EC%84%B1-%EA%B8%B0%EB%B3%B8-%EC%95%84%EB%B0%94%ED%83%80-%EC%82%AC%EC%A7%84-%EC%9E%90%EB%A6%AC-%ED%91%9C%EC%8B%9C-%EC%9E%90-%ED%9D%B0%EC%83%89-%EB%B0%B0%EA%B2%BD%EC%97%90-%EA%B3%A0%EB%A6%BD-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98.jpg" />
                        익명 &nbsp; #{content.tag_name}
                    </div>
                    <hr />
                    <div class="postText">
                        <p>{content.text}</p>
                    </div>
                    <hr />
                    <form onSubmit={onSubmitComment}>
                        <input name="comment" type="text" placeholder="댓글 작성" value={postComment} onChange={onCommentChange} maxLength={2000} />
                        <button>
                            <img width="15px" src="https://cdn-icons-png.flaticon.com/512/149/149446.png" />
                        </button>
                    </form>
                    <hr />
                    <div>
                        <h4>여기는 댓글이 추후에 구현될 공간</h4>
                    </div>
                </>
            )}
        </>
    )
}

export default PostPage;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// 추후에 편집, 삭제 구현 시 authService.currentUser.uid === contentObj.creator_id 비교 목적
import { authService } from "../lib/FAuth";
import { dbService } from "../lib/FStore";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";


const PostPage = () => {
    const [postTimeStr, setPostTimeStr] = useState();
    const navigate = useNavigate();
    const { id } = useParams();
    const [content, setContent] = useState({});
    const [isContentError, setIsContentError] = useState(false);
    const [newWorryText, setNewWorryText] = useState("");
    const [editing, setEditing] = useState(false);
    // 추후 댓글 구현을 위한 포석
    const [postComment, setPostComment] = useState("");
    
    // FireStore에서 WorryPost의 Document를 받아온 뒤, content 라는 이름의 state에 저장하는 함수
    // content 상태를 사용하는 모든 함수들(onDeleteClick, toggleEditing, onSubmit)보다 먼저 선언되어야 함.
    
    const getContent = async () => {
        const docRef = doc(dbService, "WorryPost", id);
        const docSnapShot = await getDoc(docRef);
        if (docSnapShot.exists()) {
            console.log("Doc Data: ", docSnapShot.data().created_timestamp);
            const contentObj = {
                ...docSnapShot.data(),
                id
            }
            setContent(contentObj);
            // conetneObj의 timestamp를 Date로 바꾼 뒤 한국 날짜 형식으로 바꿔준다.
            // timestamp가 state에 올라간 뒤로부터는 더 이상 timestamp로 인식되지 않는다.
            // 따라서 state에 올라가기 전에 미리 우리가 원하는 문자열로 변환해준 뒤 올렸다.
            // 아마 댓글의 시각 표시도 이런 식으로 진행해야 할 것이다.
            const test = contentObj.created_timestamp.toDate();
            setPostTimeStr(
                String((test.getMonth() + 1) + "월 "
                + test.getDate() + "일 " 
                + ("0" + test.getHours()).slice(-2) + ":" + ("0" + test.getMinutes()).slice(-2))
            )
        } else {
            setIsContentError(true);
            console.log("No such Document!");
        }
    }
    

    const onChange = (e) => {
        const {
            target: { name, value }
        } = e;
        
        if (name === "comment") {
            setPostComment(value);
        } else if (name === "edit") {
            setNewWorryText(value);
        }
    }

    const onDeleteClick = async (e) => {
        const check = window.confirm("정말로 삭제 하시겠습니까?");
        if (check) {
            console.log(`deleting ${content.id}`);
            await deleteDoc(doc(dbService, 'WorryPost', content.id))
            .then(alert("삭제 되었습니다."))
            .then(navigate('/'))
        }
    };

    const toggleEditing = () => {
        setEditing((prev) => !prev);
        setNewWorryText(content.text);
    };
    
    const onSubmit = async (e) => {
        e.preventDefault();
        // 추후 댓글 구현 예정
        const {
            target: { name }
        } = e;
        console.log()
        if (name === "submitComment") {
            // 댓글 전송하기
        } else if (name === "submitEdit") {
            const check = window.confirm("정말로 수정하시겠습니까?");
            if (check) {
                await updateDoc(doc(dbService, 'WorryPost', content.id), {
                    text: newWorryText,
                })
                    .then(alert("수정되었습니다."))
                    .then(setEditing(false))
                await getContent();
            }
            
        }
    }

    useEffect(() => {
        getContent();
    }, [])
    return (
        <>
        {
        // 만약 문서를 불러올 수 없더라도 뒤로가기는 유효해야 하므로 ternary 바깥에 두었음.
        // "글 본문", "댓글", "현재 태그와 같은 태그를 가진 새로운 고민" 부분은 문서를 불러올 수 없으면 에러가 나므로 ternary 안에 있음.
        }
        <button>뒤로가기</button>
        {isContentError ? 
            (<b>존재하지 않는 포스트입니다.</b>
            ) : (
                <>
                    {
                        //삼항연산자
                        //if 사용자가 작성자라면 글삭제 또는 수정 가능
                        //else: 좋아요, 채팅, 신고하기 가능
                    }
                    {(authService.currentUser.uid === content.creator_id) ? 
                        (
                            <div class="deleteOrEdit">
                                    <button onClick={toggleEditing}>{editing ? `취소하기` : `수정하기`}</button>
                                <button onClick={onDeleteClick}>삭제하기</button>
                            </div>
                        ) : (
                            <div class="likeOrChatOrReport">
                                <button>공감하기</button>
                                <br />
                                <button>채팅하기</button>
                                <br />
                                <button>신고하기</button>
                                <br />
                            </div>
                        )}
                    <div>포스트 페이지 for 문서 ID: {id}</div>
                    <hr />
                    <div class="postInfo">
                        <img alt="익명 프로필 이미지" width="30px" src="https://previews.123rf.com/images/salamatik/salamatik1801/salamatik180100019/92979836-%ED%94%84%EB%A1%9C%ED%95%84-%EC%9D%B5%EB%AA%85%EC%9D%98-%EC%96%BC%EA%B5%B4-%EC%95%84%EC%9D%B4%EC%BD%98-%ED%9A%8C%EC%83%89-%EC%8B%A4%EB%A3%A8%EC%97%A3-%EC%82%AC%EB%9E%8C%EC%9E%85%EB%8B%88%EB%8B%A4-%EB%82%A8%EC%84%B1-%EA%B8%B0%EB%B3%B8-%EC%95%84%EB%B0%94%ED%83%80-%EC%82%AC%EC%A7%84-%EC%9E%90%EB%A6%AC-%ED%91%9C%EC%8B%9C-%EC%9E%90-%ED%9D%B0%EC%83%89-%EB%B0%B0%EA%B2%BD%EC%97%90-%EA%B3%A0%EB%A6%BD-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98.jpg" />
                        익명 
                        &nbsp; 
                        #{content.tag_name}
                        &nbsp; &nbsp;
                        {postTimeStr}
                    </div>
                    <hr />
                    <div class="postTextorEdit">
                        {
                            editing ?
                            (
                            <>
                                <form name="submitEdit" onSubmit={onSubmit}>
                                    <textarea name="edit" value={newWorryText} type="text" required onChange={onChange} />
                                    <button>수정하기</button>
                                </form>
                            </>
                            ) : (<p style={{whiteSpace: "pre-wrap"}}>{content.text}</p>)
                        }
                    </div>
                    <hr />
                    <form name="submitComment" onSubmit={onSubmit}>
                        <input name="comment" type="text" placeholder="댓글 작성" value={postComment} onChange={onChange} maxLength={2000} />
                        <button>
                            <img alt="댓글 전송 아이콘" width="15px" src="https://cdn-icons-png.flaticon.com/512/149/149446.png" />
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../lib/FAuth";
import { dbService } from "../lib/FStore";
import { addDoc, collection, serverTimestamp } from "firebase/firestore"

const WritePage = () => {
    const navigate = useNavigate();
    const [writeContent, setWriteContent] = useState("");
    const onSubmit = async (e) => {
        e.preventDefault();
        try{
            const docRef = await addDoc(collection(dbService, "WorryPost"), {
                created_timestamp: serverTimestamp(),
                creator_id: authService.currentUser.uid, // 현재 사용자의 uid
                like_count: 0,
                post_rep_accept: false,
                tag_name: "",
                text: writeContent
            })
            console.log("Document written with ID: ", docRef.id);
            alert("고민이 정상적으로 업로드되었습니다.");
            navigate('/');
        } catch (error) {
            console.log("Error adding document: ", error);
        }
        setWriteContent("");
    }
    const onChange = (e) => {
        const {
            target: { name, value }
        } = e;
        
        if (name === "write") {
            setWriteContent(value);
        }
    }

    return (
        <div>
            <p>
                포스트 작성 페이지
            </p>
            <form onSubmit={onSubmit}>
                <input name="write" type="text" placeholder="무엇이 고민이신가요?" value={writeContent} onChange={onChange} maxLength={2000} />
                <button>고민 업로드하기</button>
            </form>
        </div>
    )
}

export default WritePage;
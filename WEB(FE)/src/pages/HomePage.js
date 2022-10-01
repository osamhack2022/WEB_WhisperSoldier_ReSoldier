import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { dbService } from "../lib/FStore";
import { authService } from "../lib/FAuth";
import { query, collection, getDocs, limit, orderBy } from "firebase/firestore"

const HomePage = () => {
    const [searchWord, setSearchWord] = useState("");
    const [worryPosts, setWorryPosts] = useState([]);
    const getPosts = async () => {
        const q = await query(
            collection(dbService, "WorryPost"),
            limit(5),
            orderBy("created_timestamp", "desc")
        );
        const querySnapShot = await getDocs(q);
        querySnapShot.forEach((doc) => {
            const postObj = {
                ...doc.data(),
                id: doc.id,
            }
            setWorryPosts(prev => [...prev, postObj]);
            // console.log(doc.id, " => " , doc.data())
        });
    };

    const onClick = (e) => {
        const {
            target: { name }
        } = e;
        
        if (name === "logout") {
            authService.signOut();
        }
    }

    useEffect(() => {
        getPosts();
    }, [])
    const onChange = (e) => {
        const {
            target : {name, value}
        } = e;

        if(name === "search"){
            setSearchWord(value);
        }
    }
    console.log(worryPosts);
    return (
    <div>
        <p>
            Home
        </p>
        <button name="logout" onClick={onClick}>로그아웃</button>
        <p>
            <input name="search" type="search" placeholder="검색어를 입력하세요" value={searchWord} onChange={onChange} />
            <Link to="/write">고민 작성하기</Link>
        </p>
        <h2>
            고민 목록
        </h2>
        <div>
            {worryPosts.map(post => <div key={post.id}><hr/>
                <Link to={`/post/${post.id}`}>{post.text}</Link>
                
                <p>
                {(Math.floor((new Date() - post.created_timestamp.toDate()) / (1000 * 60)) < 5) ? 
                <p>방금 전</p>
                    : (Math.floor((new Date() - post.created_timestamp.toDate()) / (1000 * 60 * 60)) < 1) ? 
                    <p>{Math.floor((new Date() - post.created_timestamp.toDate()) / (1000 * 60))}분 전</p>
                        : (Math.floor((new Date() - post.created_timestamp.toDate()) / (1000 * 60 * 60)) < 24) ?
                        <p>{Math.floor((new Date() - post.created_timestamp.toDate()) / (1000 * 60 * 60))}시간 전</p>
                            : (Math.floor((new Date() - post.created_timestamp.toDate()) / (1000 * 60 * 60)) < 744) ?
                            <p>{Math.floor((new Date() - post.created_timestamp.toDate()) / (1000 * 60 * 60 * 24))}일 전</p>
                            :<p>오래 전</p>
                }</p>
                </div>)}
        </div>
        
    </div>
    );
};

export default HomePage;
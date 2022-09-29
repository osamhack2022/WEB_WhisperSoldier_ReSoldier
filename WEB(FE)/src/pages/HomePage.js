import { useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () =>{
    const [searchWord, setSearchWord] = useState("");
    const onChange = (e) => {
        const {
            target : [name, value]
        } = e;

        if(name === "search"){
            setSearchWord(value);
        }
    }
    return (
    <div>
        <p>
            Home
        </p>
        <p>
            <input name="search" type="search" placeholder="검색어를 입력하세요" value={searchWord} onChange={onChange} />
            <Link to="/write">고민 작성하기</Link>
        </p>
        <p>
            고민 목록
        </p>
        
    </div>
    );
};

export default HomePage;
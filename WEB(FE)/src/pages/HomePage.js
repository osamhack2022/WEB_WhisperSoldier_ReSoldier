import { useState } from "react";

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
        <input name="search" type="search" placeholder="검색어를 입력하세요" value={searchWord} onChange={onChange} />
    </div>
    );
};

export default HomePage;
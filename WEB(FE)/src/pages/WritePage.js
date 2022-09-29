import { useState } from "react";

const WritePage = () =>{
    const [post, setPost] = useState("");
    const onChange = (e)=>{
        const {
            target : name, value
        } = e;
        if(name == "post"){
            setPost(value);
        }
    }
    const onClick = () =>{
        
    }
    return (<>
        <div>포스트 작성 페이지</div>
        <input name="post" placeholder="고민글을 작성해보세요"></input>
        <button>고민 등록하기</button>
    </>
    
    )
}

export default WritePage;
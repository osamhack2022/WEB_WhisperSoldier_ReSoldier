// import LoginButton from "../components/Buttons";
// import InputBox from "../components/InputBox";
// import styled from "styled-components";
import { useState } from "react";

// const StyledInputBox = styled.input`
//     box-sizing: border-box;
//     width: 320px;
//     height: 48px;
//     margin: 10px 0px;
//     padding : 0px 10px;
//     border-radius: 25px;
//     border: solid 2px #000;
//     background-color: #fff;
// `;

// const LoginBox = styled.div`
//     width: 320px;
//     height: 360px;
//     background-color: #f6f6f6;
//     padding : 20px 20px;
// `;

const LoginPage = ()=> {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onChange = (e)=>{
        const {
            target : {name, value}
        } = e;
        if(name === "email"){
            setEmail(value);
        }
        else if(name === "password"){
            setPassword(value);
        }
    }
    const onSubmit = (e) =>{
        e.preventDefault();
        /*
        firebase 연동 부분
        */
    }

    return (
    <div>
        <div>로그인 페이지</div>
        <form onSubmit={onSubmit}>
            <input name="email" type="email" placeholder="이메일" value={email} onChange={onChange}/>
            <input name="password" type="password" placeholder="비밀번호" value={password} onChange={onChange}/>
            <button>로그인하기</button>
        </form>
    </div>);
};

export default LoginPage;
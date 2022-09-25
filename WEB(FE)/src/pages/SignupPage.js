import { useState } from "react";
import { Link } from "react-router-dom";

const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {rePassword, setRePassword} = useState("");
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
        else if(name === "rePassword"){
            setRePassword(value);
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
        <div>회원 가입 페이지</div>
        <form onSubmit={onSubmit}>
            <input name="email" type="email" placeholder="이메일" value={email} onChange={onChange}/>
            <input name="password" type="password" placeholder="비밀번호" value={password} onChange={onChange}/>
            <input name="rePassword" type="password" placeholder="비밀번호 재입력" value={rePassword} onChange={onChange}/>
            <button>회원가입 하기</button>
            <Link to="/">돌아가기</Link>
        </form>
    </div>);
};

export default SignupPage;
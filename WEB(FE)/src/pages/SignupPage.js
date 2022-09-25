import { useState } from "react";
import { Link } from "react-router-dom";
import {
    getAuth,
    createUserWithEmailAndPassword
} from "firebase/auth"

const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
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
    const onSubmit = async (e) =>{
        e.preventDefault();
        try {
            const auth = getAuth();
            const data = await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.log(error);
        }
        // 이메일 유효성 검사
        // /\d{13}@narasarang.co.kr/;
        // 이메일 인증 절차
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
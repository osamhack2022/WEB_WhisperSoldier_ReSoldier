import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../lib/fbase";
import {
    getAuth,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signOut
} from "firebase/auth"

const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [isNarasarang, setIsNarasarang] = useState(false);
    const regex = /\d{13}@narasarang.or.kr/;
    const navigate = useNavigate();
    
    const onChange = (e)=>{
        const {
            target : {name, value}
        } = e;
        if(name === "email"){
            setEmail(value);
            setIsNarasarang(regex.test(value));
            console.log(isNarasarang);
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
            // const auth = getAuth();
            const data = await createUserWithEmailAndPassword(authService, email, password);
            if (authService.currentUser.emailVerified === false) {
                navigate('/register')
                alert("다음으로 이메일 인증을 수행해야 합니다. 인증 메일을 발송합니다.\n이메일 인증이 끝나면 로그인으로 돌아가서 다시 로그인해보세요.")
                sendEmailVerification(authService.currentUser)
                    .then(console.log("이메일 인증이 끝나면 로그인으로 돌아가서 다시 로그인해보세요."))
                    .catch(error => console.log(error));
                await signOut(authService).then(() => {
                    console.log("로그아웃 성공");
                }).catch(e => console.log(e))
                navigate('/')
            } else {
                navigate('/');
            }
        } catch (error) {
            setIsError(true);
            switch (error.code) {
                case "auth/weak-password":
                    // weak password error
                    setErrorMsg("비밀번호가 너무 약합니다.")
                    break;
                
                case "auth/email-already-in-use":
                    // already in use error
                    setErrorMsg("이미 가입된 나라사랑포털 계정입니다. 다른 계정으로 가입하세요.")
                    break;
                
                default:
                    // unknown error
                    setErrorMsg("잠시 후 다시 시도해주세요.")
                    break;
            }
            
            console.log(error.code);
            console.log(error.message);
        }
    }

    const naraOnClick = () => {
        if (authService.currentUser.emailVerified === false) {
            navigate('/register')
            alert("다음으로 이메일 인증을 수행해야 합니다. 인증 메일을 발송합니다.")
            sendEmailVerification(authService.currentUser)
                .then(console.log("이메일 인증이 끝나면 로그인으로 돌아가서 로그인해보세요."))
                .catch(error => console.log(error));
        } else {
            console.log("이미 인증된 계정입니다.")
            navigate('/');
        }
    }

    return (
    <div>
        <div>회원 가입 페이지</div>
        <form onSubmit={onSubmit}>
            <input name="email" type="email" placeholder="이메일" required value={email} onChange={onChange}/>
            <input name="password" type="password" placeholder="비밀번호" required value={password} onChange={onChange}/>
            <input name="rePassword" type="password" placeholder="비밀번호 재입력" required value={rePassword} onChange={onChange}/>
            <button disabled={!isNarasarang}>회원가입 하기</button>
            <br/>
                <div hidden={!isError}>{errorMsg}</div>
            <br/>
            <Link to="/">돌아가기</Link>
        </form>
        <br />
        <button hidden={!authService.currentUser} onClick={naraOnClick}>나라사랑메일 인증</button>
    </div>);
};

export default SignupPage;
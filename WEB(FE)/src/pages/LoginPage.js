// import LoginButton from "../components/Buttons";
// import InputBox from "../components/InputBox";
// import styled from "styled-components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, getAuth, signOut } from "firebase/auth";
import { authService } from "../lib/FAuth";

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

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [emailChecked, setEmailChecked] = useState(false);
    const navigate = useNavigate();
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
    const onSubmit = async (e) =>{
        e.preventDefault();
        try {
            // const auth = getAuth();
            const data = await signInWithEmailAndPassword(authService, email, password);
            if (authService.currentUser.emailVerified === false) {
                setEmailChecked(false);
                setIsError(true);
                setErrorMsg("이메일이 인증되지 않았습니다. 보내드렸던 인증 이메일의 링크를 클릭하시고 다시 찾아오세요.")
                // SignupPage로 가도록 한 후 거기서 인증 수행 (아직 로그아웃되지 않음)
                await signOut(authService).then(() => {
                    console.log("로그아웃 성공");
                }).catch(e => console.log(e));
            } else {
                setEmailChecked(true);
                console.log("이메일 인증 완료된 계정입니다.")
                navigate('/')
            }
            
        } catch (e) {
            setIsError(true);
            switch (e.code) {
                case "auth/wrong-password":
                    setErrorMsg("아이디 또는 비밀번호가 잘못되었습니다.");
                    break;
                case "auth/user-not-found":
                    setErrorMsg("존재하지 않는 사용자입니다.");
                    break;
                default:
                    setErrorMsg("잠시 후에 다시 시도해주세요.");
            }
            console.log(e.code);
            console.log(e.message);
        }
        /*
        firebase 연동 부분
        */
    }
    

    return (
    <div>
        <div>로그인 페이지</div>
        <form onSubmit={onSubmit}>
            <input name="email" type="email" placeholder="이메일" value={email} onChange={onChange}/>
            <br/>
            <input name="password" type="password" placeholder="비밀번호" value={password} onChange={onChange}/>
            <br/>
            <button>로그인하기</button>
            <br/>
                <div hidden={!isError}>{errorMsg}</div>
            <br/>
            <Link to="/">돌아가기</Link>
        </form>
    </div>);
};

export default LoginPage;
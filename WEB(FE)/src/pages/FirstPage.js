import { Link } from "react-router-dom";
import styled from "styled-components";

const LinkButton = styled(Link)`
    /* width: 20px; */
    /* height: 30px; */
`;

const FirstPage = () =>{
    return (
    <div>
        <div>첫 페이지</div>
        <LinkButton to="/login">로그인</LinkButton>
        <br/>
        <LinkButton to="/register">회원가입</LinkButton>
    </div>);
}

export default FirstPage;
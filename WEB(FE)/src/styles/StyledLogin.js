import styled from "styled-components";

const LoginBody = styled.div`
    width: 1440px;
    height: 960px;
    flex-grow: 0;
    padding: 300px 560px;
    background-color: #f6f6f6;
`;

const LoginBox = styled.div`
    width: 320px;
    height: 360px;
    background-color: #f6f6f6;
`;
const LoginDiv = () => <LoginBody/>;

export const styledLogin = {LoginBody, LoginBox};
export default LoginDiv;
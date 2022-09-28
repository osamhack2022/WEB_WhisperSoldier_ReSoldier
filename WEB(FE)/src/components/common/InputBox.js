import styled from "styled-components";

const styledInputBox = styled.input`
    width: 320px;
    height: 48px;
    margin: 57px 0 20px;
    padding: 16px 254px 16px 27px;
    border-radius: 25px;
    border: solid 2px #000;
    background-color: #fff;
`;

const InputBox = () => <styledInputBox autoComplete="username" name="username" placeholder="아이디"/>;

export default InputBox;
import styled from "styled-components";

const LoginButtonStyled = styled.button`
    width: 320px;
    height: 48px;
    margin: 20px 0 30px;
    /* padding: 17px 140px 17.2px; */
    border-radius: 25px;
    border: solid 2px #1a7541;
    background: #1a7541;

    &:hover{
        background : #0d552c;
    }
`;

const InnerText = styled.span`
    font-family: Roboto;
    font-size: 14px;
    font-weight: 900;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.56px;
    text-align: center;
    color: #fff;
`;

const LoginButton = props => <LoginButtonStyled>
    <InnerText {...props}></InnerText>
</LoginButtonStyled>;

export default LoginButton;
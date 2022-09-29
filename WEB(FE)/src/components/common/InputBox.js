import styled from "styled-components";

export const AuthInputBox = styled.input`
  width: 320px;
  height: 48px;
  margin: 10px 0 10px;
  padding: 16px 27px 16px 27px;
  border-radius: 25px;
  border: ${props => props.error ? "solid 2px #CD5C5c" : "solid 2px #000"};
  background-color: #fff;
  transition: all 0.5s;
  animation: ${props => props.error ? "vibration 0.1s 5" : "none"};

  @keyframes vibration {
    from {
      transform: rotate(0.5deg);
    }
    to {
      transform: rotate(-0.5deg);
    }
  }
`;

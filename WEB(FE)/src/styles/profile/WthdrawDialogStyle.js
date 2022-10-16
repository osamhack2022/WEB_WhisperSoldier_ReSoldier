import styled from "styled-components";
import media from "../../modules/MediaQuery";

export const PasswordInputBox = styled.input`
  width: 80%;
  height: 36px;
  margin: 0px 10%;
  padding: 16px 27px 16px 27px;
  border-radius: 25px;
  border: ${(props) =>
    props.error ? "solid 1px #CD5C5c" : "1px solid rgb(189, 189, 189)"};
  background-color: #fff;
  transition: all 0.5s;
  animation: ${(props) => (props.error ? "vibration 0.1s 5" : "none")};

  @keyframes vibration {
    from {
      transform: rotate(0.5deg);
    }
    to {
      transform: rotate(-0.5deg);
    }
  }

  ${media.tablet`
  width: 80%;
  `}
  ${media.mobile`
  width : 80%;
  `}
`;

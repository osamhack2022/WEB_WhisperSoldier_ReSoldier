import styled from "styled-components";
import media from "../../modules/MediaQuery";

export const AuthInputBox = styled.input`
  width: 320px;
  height: 48px;
  margin: 10px 0 10px;
  padding: 16px 27px 16px 27px;
  border-radius: 25px;
  border: ${(props) => (props.error ? "solid 2px #CD5C5c" : "solid 2px #000")};
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
`;

export const SearchBar = styled.input`
  padding: 16px 27px 16px 27px;
  border-radius: 25px;
  height: 40px;
  width: 300px;
  background-color: #fbfbfb;
  text-decoration: none;
  border: 1.5px solid rgb(0, 0, 0);
  transition: all 0.5s;
  &:hover {
    background: #f6f6f6;
  }
  ${media.tablet`
    padding: 16px 5px 16px 15px;
    width: 200px;
  `}
`;

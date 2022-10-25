import { AiOutlineWarning } from "react-icons/ai";
import styled from "styled-components";
import media from "../../modules/MediaQuery";

export const NotFoundContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  margin: 0px auto;
  width: 960px;
  height: ${(props) => props.notlogin && "100vh"};
  ${media.smallDesktop`
  margin: inherit;
  width: inherit;
  padding: 0px 10vw;
`}
  ${media.mobile`
  position: inherit;
  flex-direction: column;
  margin: inherit;
  width: inherit;
  padding: 0px 5vw;
`}
`;

export const NotFoundInfoBlock = styled.div`
  position: ${(props) => (props.notlogin ? "absolute" : "relative")};
  top: ${(props) => props.notlogin && "50%"};
  left: ${(props) => props.notlogin && "50%"};
  transform: ${(props) => props.notlogin && "translate(-50%,-50%)"};
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  margin-top: 10px;
  margin: auto;
  padding: 10px 20px;
  height: 300px;
  width: 350px;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
  transition: all 0.5s;
  ${media.tablet`
    width : 300px;
  `}
  ${media.mobile`
    width : ${(props) => (props.notlogin ? "300px" : "100%")};
  `}
`;

export const NotFoundIcon = styled(AiOutlineWarning)`
  margin-top: 30px;
  width: 100px;
  height: 100px;
  color: #a65646;
`;

export const NotFoundText = styled.div`
  margin-top: 10px;
  font-size: 16px;
  font-weight: 600;
`;

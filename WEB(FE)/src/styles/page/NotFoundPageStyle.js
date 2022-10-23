import { AiOutlineWarning } from "react-icons/ai";
import styled from "styled-components";
import media from "../../modules/MediaQuery";

export const NotFoundContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  margin: 0px auto;
  width: 960px;

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
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  position: relative;
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
    width : 250px;
  `}
  ${media.mobile`
    width : 100%;
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

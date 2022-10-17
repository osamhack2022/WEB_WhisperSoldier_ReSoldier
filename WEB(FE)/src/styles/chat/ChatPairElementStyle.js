import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import { SkyBlue } from "../../styles/Color";
import { BorderBottomOnePx } from "../../styles/Component";

export const ChatParitElementBox = styled.div`
  position: relative;
  margin-top: 10px;
  width: 90%;
  padding-bottom: ${(props) => (!props.isLast ? "10px" : "20px")};
  display: flex;
  align-items: center;
  border-bottom: ${(props) => !props.isLast && BorderBottomOnePx};
`;

export const MyInfoIcon = styled(FaUserCircle)`
  height: 40px;
  width: 40px;
  color: #555555;
`;

export const MyInfoIconBoxStyle = styled.div`
  margin-right: 10px;
  height: fit-content;
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const IsNewMesssageIcon = styled.div`
  height: 9px;
  width: 9px;
  margin-right: 10px;
  border-radius: 50%;
  margin-right: 3px;
  background-color: ${SkyBlue};
  visibility: ${(props) => (props.isNewMessage ? "visible" : "hidden")};
  transition: all 0.5s;
`;

export const ChatInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
`;

export const ChatInfoTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

export const ChatInfoContent = styled.div`
  font-size: 14px;
  font-weight: 500;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-wrap;
`;

export const ChatTimeInfo = styled.div`
  position: absolute;
  top: 2px;
  right: 10px;
  font-size: 12px;
  text-align: left;
  letter-spacing: 0.48px;
  color: #bdbdbd;
  font-weight: 400;
`;

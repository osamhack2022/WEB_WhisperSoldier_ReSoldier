import { BsPencilSquare } from "react-icons/bs";
import styled from "styled-components";
import { WritePostTitle } from "./WriteComponent";

const WritePostButtonShape = styled.button`
  position: relative;
  padding: 0px 10px;
  color: #ffffff;
  height: 28px;
  width: 90px;
  background-color: #1a7541;
  font-weight: 500;
  font-size: 11px;
  text-align: right;
  text-decoration: none;
  border-radius: 25px;
  border: 2px solid rgb(26, 117, 65);
  transition: all 0.5s;
  &:hover {
    background: #0d552c;
  }
`;

const WritPostIcon = styled(BsPencilSquare)`
  position: absolute;
  top: 50%;
  left: 15%;
  transform: translate(0%, -50%);
  background-color: rgba(0, 0, 0, 0);
  color: #ffffff;
`;

export const WritePostButton = ({ onClick, children }) => {
  return (
    <WritePostButtonShape onClick={onClick}>
      <WritPostIcon></WritPostIcon> {children}
    </WritePostButtonShape>
  );
};

export const WritePostHeaderBox = styled.div`
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 2px solid #bdbdbd;
  background-color: #fbfbfb;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const WritePostHeader = ({ onClick }) => {
  return (
    <WritePostHeaderBox>
      <WritePostTitle>고민 작성하기</WritePostTitle>
      <WritePostButton onClick={onClick}>작성완료</WritePostButton>
    </WritePostHeaderBox>
  );
};

export default WritePostHeader;

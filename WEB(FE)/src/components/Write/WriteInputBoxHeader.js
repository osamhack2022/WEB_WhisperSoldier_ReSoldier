import { BsPencilSquare } from "react-icons/bs";
import styled from "styled-components";
import { WritePostTitle } from "./WriteComponent";

const WritePostButtonShape = styled.button`
  position: relative;
  padding: 0px 10px;
  color: #ffffff;
  height: 28px;
  width: ${(props) => (props.error ? "120px" : "90px")};
  background-color: ${(props) => (props.error ? "#a65646" : "#1a7541")};
  font-weight: 500;
  font-size: 11px;
  text-align: right;
  text-decoration: none;
  border-radius: 25px;
  cursor: ${(props) => (props.error ? "default" : "pointer")};
  border: ${(props) =>
    props.error ? "1px solid rgb(166, 86, 70)" : "1px solid rgb(26, 117, 65)"};
  transition: all 0.5s;
  white-space: nowrap;
  &:hover {
    background: ${(props) => (props.error ? "#a65646" : "#0d552c")};
    color: ${(props) => (props.error ? "#ffffff" : "#ffffff")};
  }

  animation: ${(props) => (props.error ? "vibration 0.1s 5" : "none")};

  @keyframes vibration {
    from {
      transform: rotate(1deg);
    }
    to {
      transform: rotate(-1deg);
    }
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

export const WritePostButton = ({ onClick, children, errorWritePostInfo }) => {
  return (
    <WritePostButtonShape onClick={onClick} error={errorWritePostInfo}>
      {!errorWritePostInfo && <WritPostIcon></WritPostIcon>} {children}
    </WritePostButtonShape>
  );
};

export const WritePostHeaderBox = styled.div`
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #bdbdbd;
  background-color: #fbfbfb;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const WritePostHeader = ({ onClick, errorWritePostInfo }) => {
  return (
    <WritePostHeaderBox>
      <WritePostTitle>고민 작성하기</WritePostTitle>
      <WritePostButton
        onClick={onClick}
        errorWritePostInfo={errorWritePostInfo}
      >
        {errorWritePostInfo ? "내용을 입력해 주세요" : "작성완료"}
      </WritePostButton>
    </WritePostHeaderBox>
  );
};

export default WritePostHeader;

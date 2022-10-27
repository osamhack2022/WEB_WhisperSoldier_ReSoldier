import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";

export const CenterItemForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  align-items: center;
`;

export const MyInfoIconBoxStyle = styled.div`
  height: 100px;
  width: 100px;
  display: flex;
  align-items: center;
`;

export const MyInfoIcon = styled(FaUserCircle)`
  height: 100px;
  width: 100px;
  color: #555555;
`;

export const Block20px = styled.div`
  margin: 10px 0px 10px 0px;
`;

export const InputBox250px40px = styled.input`
  width: 250px;
  height: 40px;
  margin: 20px 0 10px;
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

export const RowFlexBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-items: center;
  align-items: center;
`;

export const Button250px40px = styled.button`
  height: 40px;
  width: 250px;
  background-color: ${(props) =>
    props.error ? "#a65646" : props.isLoading ? "#c8c8c8" : "#1a7541"};
  border-radius: 25px;
  border: ${(props) =>
    props.error
      ? "1px solid rgb(166, 86, 70)"
      : props.isLoading
      ? "1px solid #003000"
      : "1px solid rgb(26, 117, 65)"};
  font-size: 14px;
  text-align: center;
  margin: 10px 0 10px;
  color: ${(props) => (props.isLoading ? "#003000" : "#ffffff")};
  font-weight: 500;
  transition: all 0.5s;
  cursor: ${(props) => !props.error && !props.isLoading && "pointer"};
  &:hover {
    background: ${(props) => !props.error && !props.isLoading && "#0d552c"};
  }

  animation: ${(props) => props.error && "vibration 0.1s 5"};

  @keyframes vibration {
    from {
      transform: rotate(0.5deg);
    }
    to {
      transform: rotate(-0.5deg);
    }
  }
`;

const SubButtonBlock = styled.div`
  margin: 5px 0px;
  height: 30px;
  width: fit-content;
  align-items: center;
  border-bottom: #4f4f4f solid 2px;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    color: #003000;
    border-bottom: #003000 solid 3px;
  }
`;

const SubButtonText = styled.div`
  font-size: 12px;
  text-align: center;
  letter-spacing: 0.48px;
  text-decoration: none;
  color: #4f4f4f;
  font-weight: 600;
  &:hover {
    color: #003000;
  }
`;

export const SubButton = ({ children, onClick }) => {
  return (
    <SubButtonBlock onClick={onClick}>
      <SubButtonText>{children}</SubButtonText>
    </SubButtonBlock>
  );
};

export const SubButtonContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
`;

export const TwoColButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  align-items: center;
`;

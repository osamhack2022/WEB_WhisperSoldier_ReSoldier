import styled from "styled-components";

export const FindPasswordButtonBlock = styled.div`
  margin: 5px 0px;
  height: 30px;
  width: fit-content;
  align-items: center;
  border-bottom: #4f4f4f solid 2px;
  transition: all 0.2s;
  &:hover {
    color: #003000;
    border-bottom: #003000 solid 3px;
  }
`;

const FindPasswordButtonLink = styled.button`
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

export const EditButton = ({toggleEditing }) => {
  return (
    <FindPasswordButtonBlock>
      <FindPasswordButtonLink onClick={toggleEditing}>수정하기</FindPasswordButtonLink>
    </FindPasswordButtonBlock>
  );
};

export const DeleteButton = ({onDeleteClick }) => {
    return (
      <FindPasswordButtonBlock>
        <FindPasswordButtonLink onClick={onDeleteClick}>삭제하기</FindPasswordButtonLink>
      </FindPasswordButtonBlock>
    );
  };
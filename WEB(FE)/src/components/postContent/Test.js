import styled from "styled-components";

export const FindPasswordButtonBlock = styled.div`
  margin: 10px 0px;
  height: 26px;
  width: fit-content;
  align-items: center;
  border-bottom: #4f4f4f solid 2px;
  transition: all 0.2s;
  &:hover {
    color: #003000;
    border-bottom: #003000 solid 3px;
  }
`;

const FindPasswordButtonLink = styled.div`
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

export const EditButton = ({ toggleEditing, editing }) => {
  return (
    <FindPasswordButtonBlock>
      <FindPasswordButtonLink onClick={toggleEditing}>
        {editing ? "취소하기" : "수정하기"}
      </FindPasswordButtonLink>
    </FindPasswordButtonBlock>
  );
};

export const DeleteButton = ({ onDeleteClick }) => {
  return (
    <FindPasswordButtonBlock>
      <FindPasswordButtonLink onClick={onDeleteClick}>
        삭제하기
      </FindPasswordButtonLink>
    </FindPasswordButtonBlock>
  );
};

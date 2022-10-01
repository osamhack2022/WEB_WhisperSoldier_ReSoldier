import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: fit-content;
  width: 135px;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
`;

const SideButtonBox = ({ children }) => {
  return <ButtonContainer>{children}</ButtonContainer>;
};

export default SideButtonBox;

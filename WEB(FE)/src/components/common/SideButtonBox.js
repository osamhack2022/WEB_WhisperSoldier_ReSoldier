import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: fit-content;
  width: 110px;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
  margin-top: ${(props) => props.isNotTop && "10px"};
  transition: all 0.5s;
`;

const SideButtonBox = ({ children, isNotTop }) => {
  return <ButtonContainer isNotTop={isNotTop}>{children}</ButtonContainer>;
};

export default SideButtonBox;

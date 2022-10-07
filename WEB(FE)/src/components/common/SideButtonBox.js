import styled from "styled-components";
import media from "../../modules/MediaQuery";

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
  ${media.mobile`
  flex-direction: row;
  justify-content: flex-start;
  align-items : inherit;
  width: 100%;
  padding: 0px 0px 0px 10px;
  `}
`;

const SideButtonBox = ({ children, isNotTop }) => {
  return <ButtonContainer isNotTop={isNotTop}>{children}</ButtonContainer>;
};
export default SideButtonBox;

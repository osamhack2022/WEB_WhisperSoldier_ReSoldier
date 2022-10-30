import styled from "styled-components";
import media from "../../modules/MediaQuery";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: fit-content;
  width: 100%;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
  margin-top: ${(props) => props.isNotTop && "10px"};
  transition: all 0.5s;
  padding: 0px 0px 0px 20px;
  margin-bottom: 10px;
  ${media.mobile`
  align-items : inherit;
  width: 100%;
  `}
`;

const SideButtonBox = ({ children, isNotTop }) => {
  return <ButtonContainer isNotTop={isNotTop}>{children}</ButtonContainer>;
};
export default SideButtonBox;

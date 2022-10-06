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

const ButtonContainerForMobile = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 0px 0px 0px 10px;
  height: fit-content;
  width: 100%;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
  margin-top: ${(props) => props.isNotTop && "10px"};
  transition: all 0.5s;
`;

const SideButtonBox = ({ isDesktop, isTablet, children, isNotTop }) => {
  return isTablet ? (
    <ButtonContainer isNotTop={isNotTop}>{children}</ButtonContainer>
  ) : (
    <ButtonContainerForMobile isNotTop={isNotTop}>
      {children}
    </ButtonContainerForMobile>
  );
};

export default SideButtonBox;

/**
 * const ButtonContainerForMobile = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
padding : 0px 20px;
  height: fit-content;
  width: 100%;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
  margin-top: ${(props) => props.isNotTop && "10px"};
  transition: all 0.5s;
`;
 */

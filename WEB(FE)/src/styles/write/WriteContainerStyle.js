import styled from "styled-components";
import media from "../../modules/MediaQuery";

export const WriteContainerBox = styled.div`
  display: flex;
  margin: 0px auto;
  width: 960px;
  flex-direction: row;
  ${media.smallDesktop`
    margin: inherit;
    width: inherit;
    padding: 0px 10vw;
  `}
  ${media.mobile`
    margin: inherit;
    width: inherit;
    padding: 0px 5vw;
    flex-direction: column;
  `}
`;

export const MainContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ButtonContainerForWritePage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: inherit;
  height: fit-content;
  width: 100%;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
  padding: 0px 0px 0px 20px;
  margin-top: ${(props) => props.isNotTop && "10px"};
  transition: all 0.5s;
  ${media.mobile`
  padding: 0px 0px 0px 10px;
  `}
`;

export const SideButtonBoxForWritePage = ({ children, isNotTop }) => {
  return (
    <ButtonContainerForWritePage isNotTop={isNotTop}>
      {children}
    </ButtonContainerForWritePage>
  );
};

export const SideOptionContainer = styled.div`
  margin-left: 10px;
  height: fit-content;
  width: 190px;
  ${media.mobile`
    margin-left: inherit;
    margin-top: 10px;
    width: 100%;
    position: relative;
  `}
`;

export const SideOptionFormBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 20px;
  height: fit-content;
  width: inherit;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
`;

export const TagBoxTitleForSideBox = styled.div`
  font-size: 14px;
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
  padding-bottom: 5px;
  text-align: left;
  letter-spacing: 0.64px;
  flex-grow: 1;
  color: #0d552c;
  background-color: rgba(0, 0, 0, 0);
  font-weight: 600;
  border-bottom: 1px solid #dcdcdc;
`;

export const TagElementForSideBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 4px 0px;
  text-decoration: none;
  letter-spacing: 1px;
  color: #3f3f3f;
  font-weight: 500;
  height: fit-content;
  ${media.tablet`
    flex : 1 1 40%;
    margin: 0px 5px;
  `}
`;

export const TagContentLeftForSideBox = styled.div`
  width: fit-content;
  font-size: 13px;
  text-align: left;
`;

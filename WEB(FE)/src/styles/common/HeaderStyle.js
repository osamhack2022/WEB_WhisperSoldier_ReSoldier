import styled from "styled-components";
import media from "../../modules/MediaQuery";

export const HeaderContainer = styled.header`
  position: relative;
  width: 100%;
  height: fit-content;
  background-color: #fbfbfb;
  display: flex;
  justify-content: center;
  justify-items: center;
  align-items: center;
  border-bottom: 1px solid rgb(189, 189, 189);
  padding: 0px;
  margin-bottom: 10px;
`;

export const HeaderBox = styled.div`
  position: relative;
  box-sizing: content-box;
  border-radius: 5px;
  margin: 0px auto;
  width: 960px;
  height: 72px;
  display: flex;
  align-items: center;
  ${media.smallDesktop`
    margin: 0px;
    box-sizing: border-box;
    width : 100%;
    height: 72px;
    padding: 20px 10vw;
  `}

  ${media.mobile`
    position: relative;
    width: 100%;
    height: 60px;
    padding: 20px 5vw;
    display: flex;
    align-items: center;
  `}
`;

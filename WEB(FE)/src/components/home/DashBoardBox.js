import { useEffect, useState } from "react";
import styled from "styled-components";
import media from "../../modules/MediaQuery";

const DashBoardBoxStyle = styled.div`
  margin-left: 10px;
  position: relative;
  padding: 0px 20px 0px 20px;
  height: 240px;
  min-width: 240px;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
  ${media.tablet`
  margin: inherit;
  margin-top : 10px;
  flex-direction : column;
  height: 120px;
  width: 100%;
  `}
`;

const DashBoardTitleText = styled.div`
  font-size: 14x;
  width: 100%;
  margin-top: 10px;
  padding-bottom: 10px;
  text-align: left;
  letter-spacing: 0.64px;
  flex-grow: 1;
  color: #000000;
  background-color: rgba(0, 0, 0, 0);
  font-weight: 600;
`;

const DashBoardBox = () => {
  return (
    <DashBoardBoxStyle>
      {"(구상중)"}
      <DashBoardTitleText>오늘 작성된 고민</DashBoardTitleText>
      2000
      <DashBoardTitleText>오늘 받은 공감</DashBoardTitleText>
      3030
      <DashBoardTitleText>오늘 작성된 댓글</DashBoardTitleText>
      4503
    </DashBoardBoxStyle>
  );
};

export default DashBoardBox;

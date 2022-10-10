import { useEffect, useState } from "react";
import styled from "styled-components";
import media from "../../modules/MediaQuery";

export const HomeContainerBox = styled.div`
  margin: 0px auto;
  width: 960px;
  display: flex;
  flex-direction: column;
  //flex-direction: row;
  ${media.smallDesktop`
  margin: inherit;
  width: inherit;
  padding: 0px 10vw;
  `}
  ${media.mobile`
  padding: 0px 5vw;
  `}
`;

export const HomeContentUpperBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  transition: all 0.5s;
  ${media.tablet`
  flex-direction : column;
  `}
`;

export const HomeContentLowerBox = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  transition: all 0.5s;
  ${media.tablet`
  flex-wrap: wrap;
  `}
`;

import styled from "styled-components";
import media from "../../modules/MediaQuery";

export const AuthLogo = styled.div`
  font-size: 32px;
  text-align: center;
  letter-spacing: 1.12px;
  /* text-transform: uppercase; */
  color: #1a7541;
  font-weight: 700;
  height: fit-content;
  width: fit-content;
`;

export const SubLogo = styled.div`
  font-size: 18px;
  text-align: center;
  letter-spacing: 0.72px;
  /* text-transform: uppercase; */
  color: #0d552c;
  font-weight: 600;
  height: fit-content;
  width: 114px;
`;

export const FirstComment = styled.div`
  position: absolute;
  top: -40px;
  font-size: 26px;
  text-align: center;
  background-color: #f6f6f6;
  font-weight: 700;
`;

export const MainTitle = styled.span`
  margin: 0px;
  padding: 0px;
  font-size: 20px;
  font-weight: 700;
  font-style: normal;
  line-height: normal;
  letter-spacing: 1.12px;
  text-align: center;
  color: #1a7541;
  ${media.smallDesktop`
    font-size : 20px;
  `}
  ${media.mobile`
    font-size: 19px;
  `}
`;

export const SubTitle = styled.div`
  margin: 0px;
  padding: 0px;
  position: relative;
  top: -5px;
  font-size: 14px;
  text-align: right;
  letter-spacing: 0.72px;
  color: #0d552c;
  font-weight: 600;
  margin-left: 10px;
  ${media.smallDesktop`
    margin: inherit;
    margin-left : 10px;
    padding : inherit;
    top : -5px;
  `}
  ${media.mobile`
    top: inherit;
    font-size : 13px;
  `}
`;

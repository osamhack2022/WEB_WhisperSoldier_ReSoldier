import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import { TabletQuery } from "../../lib/Const";

const FooterBox = styled.footer`
  width: 100%;
  height: 90px;
  margin-top: 20px;
  /*margin-bottom: 50px;*/
  padding: 20px 10vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FooterText = styled.div`
  font-size: 12px;
  text-align: center;
  letter-spacing: 0.48px;
  color: #555555;
  font-weight: 400;
  height: 14px;
`;

const FooterBoxForMobile = styled.footer`
  width: 100%;
  height: 90px;
  margin: 20px 0px 50px 0px;
  /*margin-bottom: 50px;*/
  padding: 20px 10vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Footer = () => {
  const isTablet = useMediaQuery({ query: TabletQuery });
  const curDate = new Date();
  return (
    <>
      {isTablet ? (
        <FooterBox>
          <FooterText>
            copyrightⓒ {curDate.getFullYear()} All rights reserved by ReSoldier
          </FooterText>
        </FooterBox>
      ) : (
        <FooterBoxForMobile>
          <FooterText>
            copyrightⓒ {curDate.getFullYear()} All rights reserved by ReSoldier
          </FooterText>
        </FooterBoxForMobile>
      )}
    </>
  );
};

export default Footer;

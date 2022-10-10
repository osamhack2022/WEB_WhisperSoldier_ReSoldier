import styled from "styled-components";
import Slider from "react-slick";
import media from "../../modules/MediaQuery";
import "../../styles/slick/slick.css";
import "../../styles/slick/slick-theme.css";
import testBannerImg from "../../asset/bannerImg.png";

import testBannerImg2 from "../../asset/bannerImg2.png";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

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

const BannerBoxStyle = styled.div`
  padding: 0px;
  position: relative;
  width: 710px;
  height: 240px;

  background-color: #fbfbfb;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid rgb(189, 189, 189);
  ${media.smallDesktop`
  width: 100%;
  max-width : 710px;
  flex-grow: 1;
  `}
  ${media.tablet`
  height: 180px;
  width: 100%;
  flex-grow: 1;
  `}
`;

const BannerImgBox = styled.img`
  height: 240px;
  width: 100%;
  object-fit: cover;
  ${media.tablet`
  height: 180px;
  width: 100%;
  `}
`;

const BannerElement = styled.div`
  height: 240px;
  width: 200px;
  font-size: 20px;
  color: #ffffff;
  background: rgb(26, 117, 65);
  ${media.tablet`
  height: 180px;
  width: 100%;
  `}
`;

const BannerElement2 = styled.div`
  height: 240px;
  width: 200px;
  font-size: 20px;
  color: #ffffff;
  background: rgb(26, 0, 65);
  ${media.tablet`
  height: 180px;
  width: 100%;
  `}
`;

const BannerSliderStyle = styled.div`
  height: 240px;
`;

const NextArrowButtonIcon = styled(BsArrowRightCircle)`
  z-index: 1;
  width: 20px;
  height: 20px;
  position: absolute;
  padding: 0;
  top: 50%;
  -webkit-transform: translate(0, -50%);
  -ms-transform: translate(0, -50%);
  transform: translate(0, -50%);
  color: #ffffff;
  right: 25px;
  transition: all 0.5s;
  &:hover {
    color: #c8c8c8;
  }
`;

const PreviousArrowButtonIcon = styled(BsArrowLeftCircle)`
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 20px;
  height: 20px;
  position: absolute;
  padding: 0;
  top: 50%;
  -webkit-transform: translate(0, -50%);
  -ms-transform: translate(0, -50%);
  transform: translate(0, -50%);
  color: #ffffff;
  left: 25px;
  transition: all 0.5s;
  &:hover {
    color: #c8c8c8;
  }
`;

const NextArrowButton = ({ className, style, onClick }) => {
  return (
    <NextArrowButtonIcon
      className={className}
      style={{ ...style }}
      onClick={onClick}
    ></NextArrowButtonIcon>
  );
};

const PreviousArrowButton = ({ className, style, onClick }) => {
  return (
    <PreviousArrowButtonIcon
      className={className}
      style={{ ...style }}
      onClick={onClick}
    ></PreviousArrowButtonIcon>
  );
};

export const BannerBox = ({ children }) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <NextArrowButton />,
    prevArrow: <PreviousArrowButton />,
  };
  return (
    <BannerBoxStyle>
      {children}
      <BannerSliderStyle>
        <Slider {...settings}>
          <BannerImgBox src={testBannerImg2}></BannerImgBox>
          <BannerElement2>2</BannerElement2>
          <BannerElement>3</BannerElement>
          <BannerElement2>4</BannerElement2>
          <BannerElement>5</BannerElement>
          <BannerElement2>6</BannerElement2>
        </Slider>
      </BannerSliderStyle>
    </BannerBoxStyle>
  );
};

export const DashBoardBox = styled.div`
  margin-left: 10px;
  position: relative;
  padding: 0px 20px 0px 20px;
  height: 240px;
  width: 240px;
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

export const TagBox = styled.div`
  margin-left: 10px;
  position: relative;
  padding: 0px 20px 0px 20px;
  height: 480px;
  width: 240px;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
  ${media.tablet`
  margin: inherit;
  margin-top: 10px;
  flex-basis: 100%;
  height :240px;`}
`;

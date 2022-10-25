import styled from "styled-components";
import Slider from "react-slick";
import media from "../../modules/MediaQuery";
import "../../styles/slick/slick.css";
import "../../styles/slick/slick-theme.css";
import testBannerImg1 from "../../asset/1.png";
import testBannerImg2 from "../../asset/2.png";
import testBannerImg3 from "../../asset/3.png";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { useEffect, useState } from "react";
import { storageFunction, storageService } from "../../lib/FStore";

const BannerBoxStyle = styled.div`
  padding: 0px;
  position: relative;
  width: 760px;
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

const BannerBox = () => {
  const [banneerImgUrl, setBannerImgUrl] = useState([
    "https://firebasestorage.googleapis.com/v0/b/whisper-soldier-database.appspot.com/o/bannerImg%2F1.png?alt=media&token=c2bd9675-067c-4f02-bbfa-71c0cc4fd886",
    "https://firebasestorage.googleapis.com/v0/b/whisper-soldier-database.appspot.com/o/bannerImg%2F2.png?alt=media&token=b2c4cbbc-2cde-4aec-9ecc-1477a375d5b5",
    "https://firebasestorage.googleapis.com/v0/b/whisper-soldier-database.appspot.com/o/bannerImg%2F3.png?alt=media&token=c3d10ebb-34c0-44c3-8f0e-149104af9385",
  ]);
  const { ref } = storageFunction;
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    nextArrow: <NextArrowButton />,
    prevArrow: <PreviousArrowButton />,
  };

  return (
    <BannerBoxStyle>
      <BannerSliderStyle>
        <Slider {...settings}>
          <BannerImgBox src={banneerImgUrl[0]}></BannerImgBox>
          <BannerImgBox src={banneerImgUrl[1]}></BannerImgBox>
          <BannerImgBox src={banneerImgUrl[2]}></BannerImgBox>
        </Slider>
      </BannerSliderStyle>
    </BannerBoxStyle>
  );
};

export default BannerBox;

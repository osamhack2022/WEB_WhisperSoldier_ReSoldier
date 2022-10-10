import styled from "styled-components";
import Slider from "react-slick";
import media from "../../modules/MediaQuery";
import "../../styles/slick/slick.css";
import "../../styles/slick/slick-theme.css";
import testBannerImg1 from "../../asset/1.png";
import testBannerImg2 from "../../asset/2.png";
import testBannerImg3 from "../../asset/3.png";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

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
      <BannerSliderStyle>
        <Slider {...settings}>
          <BannerImgBox src={testBannerImg1}></BannerImgBox>
          <BannerImgBox src={testBannerImg2}></BannerImgBox>
          <BannerImgBox src={testBannerImg3}></BannerImgBox>
        </Slider>
      </BannerSliderStyle>
    </BannerBoxStyle>
  );
};

export default BannerBox;

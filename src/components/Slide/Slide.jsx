import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Style } from './SlideStyle';
import styled from 'styled-components';

const Slide = ({ RestaurantInfoData }) => {
  const settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const getPathname = window.location.pathname;
  const mainPath = getPathname === '/';

  return (
    <Style.Slide>
      <CustomSlider {...settings} mainPath={mainPath}>
        {RestaurantInfoData?.images &&
          RestaurantInfoData?.images.map(info => (
            <div key={info.id}>
              <img src={info.image} alt="img" />
            </div>
          ))}
      </CustomSlider>
    </Style.Slide>
  );
};

export default Slide;

const CustomSlider = styled(Slider)`
  .slick-prev {
    display: none !important;
  }
  .slick-next {
    display: none !important;
  }
  .slick-dots {
    display: ${props => props.mainPath && 'none !important'};
  }
`;

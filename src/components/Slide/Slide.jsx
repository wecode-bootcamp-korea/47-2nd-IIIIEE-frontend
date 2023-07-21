import React from 'react';
import Slider from 'react-slick';
import { useLocation } from 'react-router-dom';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Style } from './SlideStyle';
import styled from 'styled-components';

const Slide = ({ restaurantInfoData }) => {
  const settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const location = useLocation();
  const getPathname = location.pathname;
  const mainPath = getPathname === '/';

  return (
    <Style.Slide>
      <CustomSlider {...settings} mainPath={mainPath}>
        {restaurantInfoData?.images?.length > 0 &&
          restaurantInfoData?.images?.map(info => (
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

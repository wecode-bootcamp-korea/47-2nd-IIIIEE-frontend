import React, { useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import { renderToStaticMarkup } from 'react-dom/server';
const { kakao } = window;

const Map = ({ RestaurantInfoData }) => {
  const position = new kakao.maps.LatLng(
    RestaurantInfoData?.y,
    RestaurantInfoData?.x,
  );

  const mapContainer = useRef(null);

  useEffect(() => {
    const mapOptions = {
      center: position,
      level: 3,
    };

    const map = new kakao.maps.Map(mapContainer.current, mapOptions);

    const imageSrc = `${process.env.PUBLIC_URL}/images/IIIIEE_marker.png`,
      imageSize = new kakao.maps.Size(50, 69),
      imageOption = { offset: new kakao.maps.Point(27, 69) };

    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption,
    );

    let marker = new kakao.maps.Marker({
      position,
      image: markerImage,
    });

    const content = renderToStaticMarkup(
      <MargetText>
        <span>{RestaurantInfoData?.name}</span>
      </MargetText>,
    );

    new kakao.maps.CustomOverlay({
      map,
      position,
      content,
    });

    marker.setMap(map);
  }, [RestaurantInfoData]);

  return (
    <div
      id="map"
      ref={mapContainer}
      style={{ width: '100%', height: '400px' }}
    />
  );
};

export default Map;

const MargetText = styled.div`
  position: absolute;
  top: -108px;
  right: -48px;
  padding: 8px;
  background: #fff;
  border: 3px solid #ff914d;
  border-radius: 10px;

  span {
    font-weight: 500;
  }
`;

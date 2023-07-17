import { useEffect, useState } from 'react';
import Map from '../../components/Map';
import Slide from '../../components/Slide/Slide';
import { Style } from './RestaurantInfoStyle';
const RestaurantInfo = () => {
  const [RestaurantInfoData, setRestaurantInfoData] = useState({});

  useEffect(() => {
    fetch('./data/RestaurantInfoData.json')
      .then(res => res.json())
      .then(data => setRestaurantInfoData(data.data));
  }, []);

  return (
    <Style.RestaurantInfoBox>
      <Slide RestaurantInfoData={RestaurantInfoData} />
      <Style.Title>{RestaurantInfoData?.name}</Style.Title>
      <Style.StarRating>
        <Style.Star>★</Style.Star>
        <span>{RestaurantInfoData?.star}</span>
      </Style.StarRating>
      <Style.Comments>{RestaurantInfoData?.description}</Style.Comments>

      <Style.MapBox>
        <Map RestaurantInfoData={RestaurantInfoData} />
      </Style.MapBox>
    </Style.RestaurantInfoBox>
  );
};
export default RestaurantInfo;

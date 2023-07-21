import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Map from '../../components/Map';
import Slide from '../../components/Slide/Slide';
import { Style } from './RestaurantInfoStyle';
const RestaurantInfo = () => {
  const [restaurantInfoData, setRestaurantInfoData] = useState({});
  const { restaurantId } = useParams();

  useEffect(() => {
    fetch(`http://${process.env.REACT_APP_IP}/restaurants/info/${restaurantId}`)
      .then(res => res.json())
      .then(data => setRestaurantInfoData(data.data));
  }, [restaurantId]);

  const isEmpty = Object.keys(restaurantInfoData).length === 0;
  if (isEmpty) return null;

  return (
    <Style.RestaurantInfoBox>
      <Slide restaurantInfoData={restaurantInfoData} />
      <Style.Title>{restaurantInfoData.name}</Style.Title>
      <Style.StarRating>
        <Style.Star>★</Style.Star>
        <span>{restaurantInfoData.star}</span>
      </Style.StarRating>
      <Style.Comments>{restaurantInfoData.description}</Style.Comments>

      <Style.MapBox>
        <Map restaurantInfoData={restaurantInfoData} />
      </Style.MapBox>
    </Style.RestaurantInfoBox>
  );
};
export default RestaurantInfo;

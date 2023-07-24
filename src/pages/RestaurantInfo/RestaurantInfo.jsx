import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Map from '../../components/Map';
import Slide from '../../components/Slide/Slide';
import { Style } from './RestaurantInfoStyle';
const RestaurantInfo = () => {
  const [RestaurantInfoData, setRestaurantInfoData] = useState({});

  const { restaurantId } = useParams();

  useEffect(() => {
    fetch(`http://10.58.52.135:3000/restaurants/info/${restaurantId}`)
      .then(res => res.json())
      .then(data => setRestaurantInfoData(data.data));
  }, [restaurantId]);

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

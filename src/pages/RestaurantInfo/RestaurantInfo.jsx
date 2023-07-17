import { Style } from './RestaurantInfoStyle';

const RestaurantInfo = () => {
  return (
    <Style.RestaurantInfoBox>
      <Style.Img src="./images/abcdefg.png" alt="img" />
      <Style.Title>회진네 회집</Style.Title>
      <Style.StarRating>
        <Style.Star>★</Style.Star>
        <span>4.9</span>
      </Style.StarRating>
      <Style.Comments>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </Style.Comments>
      <div>
        <Style.Img src="./images/map.png" alt="img" />
      </div>
    </Style.RestaurantInfoBox>
  );
};
export default RestaurantInfo;

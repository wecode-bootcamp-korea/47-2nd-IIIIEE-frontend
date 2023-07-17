import { styled } from 'styled-components';

export const Style = {
  RestaurantInfoBox: styled.div`
    height: 100vh;
    padding: 130px 1em 71px;
    overflow: scroll;
  `,
  Img: styled.img`
    display: block;
    width: 100%;
  `,
  Title: styled.p`
    padding: 1em 0;
    font-size: 1.3em;
    font-weight: 600;
  `,
  StarRating: styled.div`
    display: flex;
    font-size: 1.3em;
  `,
  Star: styled.p`
    margin-right: 0.2em;
    color: ${props => props.theme.mainColor};
  `,
  Comments: styled.div`
    padding: 1em 0;
  `,
  MapBox: styled.div`
    padding-bottom: 2em;
  `,
};

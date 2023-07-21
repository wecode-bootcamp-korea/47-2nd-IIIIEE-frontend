import { styled } from 'styled-components';

const Style = {
  Full: styled.div`
    display: flex;
    flex-direction: column;
    padding: 75px 1em 1em 1em;
    gap: 20px;
  `,

  GatheringImg: styled.img`
    height: 200px;
  `,

  AddBtn: styled.button`
    width: 17em;
    padding: 1em;
    border: 0px;
    border-radius: 7px;
    background-color: #ff914d;
    color: white;
    font-size: 1.5em;
  `,

  Container: styled.div`
    border: 1px solid lightgray;
    border-radius: 7px;
    padding: 10px;
    display: flex;
    gap: 10px;
  `,

  Top: styled.div`
    display: flex;
    gap: 1.3em;
    justify-content: center;
  `,

  Border: styled.div`
    border-top: ${props => props.theme.borderDiv};
  `,
};

export default Style;

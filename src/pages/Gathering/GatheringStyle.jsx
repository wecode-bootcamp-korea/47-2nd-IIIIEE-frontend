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
    opacity: ${props => (props.applyBtnCondition ? 1 : 0.5)};
  `,

  Container: styled.div`
    border: 1px solid lightgray;
    border-radius: 7px;
    padding: 10px;
    display: flex;
    gap: 10px;
    svg {
      font-size: 1em;
      path {
        color: ${props =>
          props.checkBell ? props.theme.mainColor : 'lightgray'};
        cursor: pointer;
      }
    }
  `,

  Top: styled.div`
    display: flex;
    gap: 0.7em;
    justify-content: start;
  `,

  Border: styled.div`
    border-top: ${props => props.theme.borderDiv};
  `,

  RoomTitle: styled.p`
    color: ${props => props.theme.mainColor};
    font-size: 2em;
    font-weight: 700;
  `,
};

export default Style;

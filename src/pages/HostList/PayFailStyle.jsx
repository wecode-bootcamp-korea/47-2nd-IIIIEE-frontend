import { styled } from 'styled-components';

const style = {
  Full: styled.div`
    padding: 80px 1em 110px 1em;
    display: flex;
    flex-direction: column;
    gap: 2em;
    div {
      display: flex;
      flex-direction: column;
      gap: 1em;
      p {
        text-align: center;
        font-size: 1.5em;
      }
    }

    button {
      cursor: pointer;
      width: 100%;
      height: 4em;
      padding: 0.5em;
      border: 0;
      border-radius: 1em;
      background: ${props => props.theme.mainColor};
      color: white;
      &:hover {
        background: #fff;
        color: ${props => props.theme.mainColor};
        border: 1px solid ${props => props.theme.mainColor};
      }
    }
  `,
};

export default style;

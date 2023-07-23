import { styled } from 'styled-components';

const style = {
  Container: styled.div`
    height: 100vh;
    display: flex;
  `,

  TextBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    gap: 0.5em;
  `,

  Title: styled.p`
    font-size: 3em;
    font-weight: 700;
    color: ${props => props.theme.mainColor};
  `,
  Text: styled.p`
    font-size: 1em;
  `,
  Btns: styled.div`
    display: flex;
    gap: 0.3em;
  `,
  Btn: styled.button`
    background-color: ${props => props.theme.mainColor};
    color: white;
    width: 10em;
    height: 2.5em;
    border-radius: 7px;
    &:hover {
      background-color: white;
      color: ${props => props.theme.mainColor};
      border: 1px solid ${props => props.theme.mainColor};
    }
  `,
};

export default style;

import { styled } from 'styled-components';

export const GestListStyle = {
  GestListBox: styled.div`
    display: flex;
    flex-direction: column;
    padding: 130px 1em 1em 1em;
  `,

  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    padding: 2em 0;
    border-bottom: 1px solid lightgray;

    &:last-child {
      border-bottom: none;
    }
  `,

  Title: styled.div`
    color: ${props => props.theme.mainColor};
    font-weight: 700;
    font-size: 1.5em;
  `,

  GatheringData: styled.div`
    display: flex;
    align-items: center;
    padding: 0.5em 0;
    gap: 0.2em;
  `,

  RegistrationBtn: styled.button`
    width: 100%;
    height: 2.5em;
    background-color: ${props => props.theme.mainColor};
    color: white;
    border: 0px;
    border-radius: 7px;
    text-align: center;
  `,
};

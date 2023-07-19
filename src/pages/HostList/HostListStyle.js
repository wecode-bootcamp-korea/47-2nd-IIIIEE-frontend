import { styled } from 'styled-components';

const HostListStyle = {
  Full: styled.div`
    display: flex;
    flex-direction: column;
    padding: 150px 1em 1em 1em;
    gap: 1.5em;
  `,
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  `,

  Title: styled.div`
    color: ${props => props.theme.mainColor};
    font-weight: 700;
    font-size: 1.5em;
  `,

  Guest: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.2em;
  `,
  GuestBtn: styled.div`
    display: flex;
    align-items: center;
    gap: 0.2em;
  `,

  GatheringData: styled.div`
    display: flex;
    align-items: center;
    gap: 0.2em;
    padding-bottom: 0.3em;
    border-bottom: 1px solid lightgray;
  `,

  RegistrationBtn: styled.button`
    background-color: ${props => props.theme.mainColor};
    color: white;
    border: 0px;
    border-radius: 7px;
    width: 100%;
    height: 2.5em;
    text-align: center;
  `,

  AgreeBtn: styled.button`
    cursor: pointer;
    width: 3em;
    padding: 0.5em;
    border: 1px solid lightgray;
    border-radius: 1em;
    background: #fff;
    color: ${props => props.theme.mainColor};
    &:hover {
      background: #ddf584;
    }
  `,
  RefuseBtn: styled.button`
    cursor: pointer;
    width: 3em;
    padding: 0.5em;
    border: 1px solid lightgray;
    border-radius: 1em;
    background: #fff;
    color: ${props => props.theme.mainColor};
    &:hover {
      background: #e8bfbf;
    }
  `,
  Complete: styled.p`
    width: 100%;
    padding: 0.5em;
    border: 1px solid lightgray;
    border-radius: 7px;
    background: #fff;
    color: ${props => props.theme.mainColor};
    text-align: center;
  `,
};
export default HostListStyle;

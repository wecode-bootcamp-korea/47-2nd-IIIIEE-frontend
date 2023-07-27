import { styled } from 'styled-components';

const Style = {
  All: styled.div`
    display: flex;
    flex-direction: column;
    gap: 2em;
  `,

  Title: styled.h1`
    font-size: 2em;
    font-weight: 700;
  `,

  Left: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
  `,

  HostImg: styled.img`
    width: 7em;
    height: 7em;
    border-radius: 50%;
  `,

  Right: styled.div`
    width: 16em;
  `,

  Description: styled.div`
    border: 1px solid lightgray;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    gap: 1em;
  `,

  Border: styled.div`
    border-top: ${props => props.theme.borderDiv};
  `,

  Padding: styled.div`
    display: flex;
    gap: 5px;
    padding: 10px 0px;
    text-align: justify;
  `,
  PaddingTop: styled.p`
    padding-top: 0.5em;
  `,

  Bold: styled.p`
    font-weight: 700;
    padding-left: 0.1em;
  `,

  ReviewToggle: styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 1em 0em;
  `,

  ReviewBox: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  `,

  ReviewDetail: styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 1em 0em 0em 0em;
    position: relative;
  `,

  TestArea: styled.div`
    display: flex;
    gap: 1em;
  `,

  ProfileBold: styled.div`
    font-weight: 700;
  `,

  Detail: styled.p`
    width: 100%;
    border-bottom: 1px solid lightgray;
    padding-bottom: 0.5em;
    text-align: justify;
    :last-child {
      border: 0px;
      padding-bottom: 0px;
    }
  `,

  AddReview: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
    width: 100%;
    button {
      width: 4em;
      height: 5em;
      border: 1px solid lightgray;
      border-radius: 7px;
      background-color: white;
      color: gray;
    }
  `,

  TextInput: styled.textarea`
    width: 26em;
    min-height: 5em;
    padding: 1em;
    border: 1px solid lightgray;
    border-radius: 7px;
    resize: none;
  `,

  XBtn: styled.div`
    cursor: pointer;
    color: #b2afaf;
    position: absolute;
    right: 1em;
  `,

  Name: styled.div`
    display: flex;
    align-items: center;
    gap: 0.5em;
  `,

  AllStar: styled.div`
    display: flex;
    svg {
      font-size: 1.3em;
      path {
        color: ${props => (props.star ? props.theme.mainColor : 'lightgray')};
        cursor: pointer;
      }
    }
  `,
  GuestStar: styled.div`
    display: flex;
    top: 0px;
    svg {
      font-size: 1.3em;
      path {
        color: ${props => props.theme.mainColor};
      }
    }
  `,
};

export default Style;

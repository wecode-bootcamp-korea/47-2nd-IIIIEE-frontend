import { styled } from 'styled-components';

const style = {
  Full: styled.div`
    padding: 75px 1em 1em 1em;
    display: flex;
    flex-direction: column;
    gap: 1em;
  `,

  ModalBtn: styled.div`
    display: flex;
    gap: 0.5em;
  `,

  GatheringImg: styled.img`
    width: 100%;
  `,

  RegisteBtns: styled.div`
    display: flex;
    gap: 1em;
    button {
      width: 50%;
      height: 3em;
      border: 0px;
      border-radius: 7px;
      color: white;
      background-color: #ff914d;
    }
  `,

  RegisteBtn: styled.button`
    width: 50%;
    height: 3em;
    border: 0px;
    border-radius: 7px;
    color: white;
    background-color: ${props => props.theme.mainColor};
    opacity: ${props => (props.condition ? '1' : '0.5')};
  `,

  FileForm: styled.form`
    width: 100%;
    padding: 1em;
    border: 1px solid lightgray;
    border-radius: 7px;

    label {
      color: #ff914d;
    }

    input {
      display: none;
    }
  `,

  ImgBox: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
  `,

  TagBtn: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  `,

  TextInput: styled.textarea`
    width: 100%;
    min-height: 8em;
    padding: 1em;
    border: 1px solid lightgray;
    border-radius: 7px;
    resize: none;
  `,

  GatheringInput: styled.input`
    width: 100%;
    padding: 1em;
    border: 1px solid lightgray;
    border-radius: 7px;
  `,

  DateBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
  `,

  TagBtns: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.3em;
    button {
      cursor: pointer;
      width: 4em;
      padding: 0.5em;
      border: 1px solid #999;
      border-radius: 1em;
      background: #fff;
      color: ${props => props.theme.mainColor};
      font-weight: 600;
      font-size: 1em;

      &:hover {
        background: #fff6d6;
      }
    }
  `,

  TagContainer: styled.div`
    display: flex;
    gap: 0.5em;
    button {
      width: 4em;
      border: 1px solid lightgray;
      border-radius: 7px;
      background-color: white;
      color: gray;
    }
  `,

  EachTagBtn: styled.div`
    display: flex;
    gap: 0.5em;
    padding: 0.7em;
    border: 1px solid #999;
    border-radius: 1em;
    background: #fff;
    p {
      color: ${props => props.theme.mainColor};
      font-weight: 600;
      font-size: 1em;
    }
  `,

  XBtn: styled.div`
    cursor: pointer;
    color: #b2afaf;
  `,

  PeoPleNum: styled.div`
    display: flex;
    align-items: center;
    gap: 0.5em;
    input {
      width: 4em;
      border: 1px solid ${props => (props.alertNum ? 'black' : 'red')};
    }
  `,
  AlertNumber: styled.p`
    color: red;
  `,
};

export default style;

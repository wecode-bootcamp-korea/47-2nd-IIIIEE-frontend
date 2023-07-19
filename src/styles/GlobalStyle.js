import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
${reset}
  * {
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
    color: #333;
  }
  button {
    cursor: pointer;
    background: none;
    border: none;
  }
`;

export default GlobalStyle;

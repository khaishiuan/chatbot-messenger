import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.background};
  }

  button {
    font-family: 'Inter', sans-serif;
  }

  input, select, textarea {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
  }
`;

export default GlobalStyles; 
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    background: ${props => props.theme.colors.background};
    font-size: 14px;
    font-family: 'Roboto', sans-serif;

    a {
      text-decoration: none
    }

    input, button, select {
      outline: none;
    }

  }
`;
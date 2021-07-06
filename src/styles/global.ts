import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --gray-50: #FAFAFA;
    --gray-100: #F7F7F7;
    --gray-200: #D9D9D9;
    --gray-500: #B7B7B7;
    --gray-transparent: rgba(220, 220, 220, 0.6);
    --text-primary: #2E384D;
    --text-secondary: #777777;
    --text-secondary-dark: #656565;
    --green-light: #F7FFF5;
    --green: #3FB023;
    --blue-light: #E3F3FF;
    --blue: #3C83EE;
    --red-light: #FFF5F5;
    --red: #FF4343;
    --orange-light: #FFF0E7;
    --orange: #FF6043;
    --white: #FFFFFF;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  @media (max-width: 1080px) {
    html {
      font-size: 93.75%;
    }
  }

  @media (max-width: 720px) {
    html {
      font-size: 87.5%;
    }
  }

  html, body, div#__next {
    font-family: 'Poppins', sans-serif;
    width: 100vw;
    height: 100vh;
  }

  body {
    background: var(--white);
  }

  body, input, textarea, button {
    font-weight: 500;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 600;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;

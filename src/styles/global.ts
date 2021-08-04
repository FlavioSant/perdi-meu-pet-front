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
    --green-medium: #D8F2D2;
    --green: #3FB023;
    --blue-light: #E3F3FF;
    --blue-medium: #C7E0FC;
    --blue: #3C83EE;
    --red-light: #FFF5F5;
    --red-medium: #FFD7D7;
    --red: #FF4343;
    --orange-light: #FFF0E7;
    --orange-medium: #FFD8CC;
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
    overflow-y: auto;
    width: 100%;
    height: 100%;
  }

  body {
    background: var(--white);
  }

  body, input, textarea, button {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
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

  .react-modal-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2500;
  }

  .react-modal-content {
    background: var(--gray-100);
    border-radius: 0.25rem;
    max-width: 960px;
    max-height: 85%;
    padding: 2.5rem;
    position: relative;
    width: 100%;
    overflow-y: auto;

    @media(max-width: 720px) {
      max-width: 400px;
      padding: 1rem;
    }
  }

  .react-modal-close {
    background: transparent;
    border: 0;
    color: var(--orange);
    font-size: 0;
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    transition: color .2s;

    &:hover {
      color: var(--red);
    }
  }
`;

export default GlobalStyle;

import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }

  :root {
    --main-color: #8b008a;
    --background: #fafafa;
    --white: #fff;
    --white-disable: #ccc;
    --font-color: #343434;
    --font-color-opaque: #575757;
  }

  body {
    background: var(--background);
    color: var(--font-color);
  }

  body, input, textarea, button {
    font: 400 16px Inter, Arial, Helvetica, sans-serif;
  }

  button {
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

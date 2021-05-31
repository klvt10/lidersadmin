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
    --main-color-200: #8b008a55;
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

  .previous {
    font-weight: bold;
    font-size: 1.5rem;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    background: var(--main-color);
  }

  .next {
    font-weight: bold;
    font-size: 1.5rem;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    background: var(--main-color);
  }

  .break-me {
    font-weight: bold;
  }

  .pagination {
    margin-top: 1rem;
    background: var(--main-color-200);
    display: flex;
    justify-content: space-between;
    border-radius: 8px;

    list-style: none;

    li {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--font-color-opaque);
      border-right: none;
      padding: 0.3rem;
      cursor: pointer;
      transition: opacity 200ms;
      color: var(--white);

      &:hover {
        opacity: 0.3;
      }

      &:last-child {
        border-right: 1px solid var(--font-color-opaque);
      }
    }
  }

  .pagination-active {
    font-weight: bold;
    background: var(--main-color);
  }
`;

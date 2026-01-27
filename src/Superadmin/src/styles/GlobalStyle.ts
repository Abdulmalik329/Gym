// styles/GlobalStyle.ts
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    color: #fff;
    font-family: Inter, sans-serif;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

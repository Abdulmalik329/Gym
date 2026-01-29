import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.text};
    font-family: 'Inter', sans-serif;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

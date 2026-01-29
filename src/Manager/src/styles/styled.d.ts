import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      bg: string;
      sidebar: string;
      card: string;
      border: string;
      primary: string;
      success: string;
      danger: string;
      text: string;
      muted: string;
    };
    radius: {
      sm: string;
      md: string;
      lg: string;
    };
  }
}

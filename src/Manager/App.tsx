import { ThemeProvider } from "styled-components";
import { theme } from "./src/styles/theme";
import { GlobalStyles } from "./src/styles/GlobalStyles";
import ManagerRoutes from "./src/routes/ManagerRoutes";

function MenegerApp() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ManagerRoutes />
    </ThemeProvider>
  );
}

export default MenegerApp;

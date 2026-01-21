import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { useAppSelector } from "./store/hooks";
import CssBaseline from "@mui/material/CssBaseline";
import { getTheme } from "./assets/styles/Theme";
import Routes from "./routes/index";

function App() {
  const mode = useAppSelector((state) => state.ui.mode);
  const theme = React.useMemo(() => getTheme(mode as "light" | "dark"), [mode]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  );
}

export default App;

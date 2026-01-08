import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Theme from "./assets/styles/Theme";
import Routes from "./routes/index";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  );
}

export default App;

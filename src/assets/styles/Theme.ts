import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#73BAFB",
      main: "#1877F2",
      dark: "#0C44AE",
      contrastText: "#FFFFFF",
    },
    secondary: {
      light: "#C684FF",
      main: "#8E33FF",
      dark: "#5119B7",
      contrastText: "#FFFFFF",
    },
    info: {
      light: "#61F3F3",
      main: "#00B8D9",
      dark: "#006C9C",
      contrastText: "#FFFFFF",
    },
    success: {
      light: "#77ED8B",
      main: "#22C55E",
      dark: "#118D57",
      contrastText: "#ffffff",
    },
    warning: {
      light: "#FFD666",
      main: "#FFAB00",
      dark: "#B76E00",
      contrastText: "#1C252E",
    },
    error: {
      light: "#FFAC82",
      main: "#FF5630",
      dark: "#B71D18",
      contrastText: "#FFFFFF",
    },
    grey: {
      "50": "#FCFDFD",
      "100": "#F9FAFB",
      "200": "#F4F6F8",
      "300": "#DFE3E8",
      "400": "#C4CDD5",
      "500": "#919EAB",
      "600": "#637381",
      "700": "#454F5B",
      "800": "#1C252E",
      "900": "#141A21",
    },
    common: { black: "#000000", white: "#FFFFFF" },
  },
  cssVariables: {
    cssVarPrefix: "",
    colorSchemeSelector: "data-color-scheme",
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            cursor: "pointer",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "10px 0",
          borderRadius: "10px",
          textTransform: "none",
          fontWeight: 700,
          backgroundColor: "#19212a",
          "&:hover": { backgroundColor: "#111820" },
          boxShadow: "none",
        },
      },
    },
  },
});

export default theme;

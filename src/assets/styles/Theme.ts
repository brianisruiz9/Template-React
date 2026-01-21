import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode: mode,
      ...(mode === "light"
        ? {
            primary: {
              light: "#73BAFB",
              main: "#1877F2",
              dark: "#c1cce0",
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
            background: {
              default: "#F9FAFB",
              paper: "#FFFFFF",
            },
          }
        : {
            primary: {
              light: "#73BAFB",
              main: "#1877F2",
              dark: "#c1cce0",
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
            background: {
              default: "#0F1214",
              paper: "#0F1214",
            },
          }),
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
            padding: "10px 25px",
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: 700,
            backgroundColor: mode === "light" ? "#19212a" : "#fff",
            color: mode === "light" ? "#FFFFFF" : "#000",
            "&:hover": { backgroundColor: mode === "light" ? "#111820" : "#dedfe0" },
            boxShadow: "none",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: "10px",
          },
        },
      },
    },
  });

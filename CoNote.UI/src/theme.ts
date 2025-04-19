import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#9235E8",
      light: "#C67FFD",
      dark: "#550293",
    },
    secondary: {
      main: "#4C4452",
      light: "#AAA3B0",
      dark: "#271932",
    },
    info: {
      main: "#195EEB",
      light: "#7BA3FC",
      dark: "#003292",
      contrastText: "#001136",
    },
    warning: {
      main: "#EEA11F",
      light: "#F7D290",
      dark: "#966207",
      contrastText: "#362200",
    },
    success: {
      main: "#35E87D",
      light: "#7FFDB1",
      dark: "#02933C",
      contrastText: "#003716",
    },
    error: {
      main: "#E8353E",
      light: "#FD7F85",
      dark: "#930209",
      contrastText: "#370003",
    },
    grey: {
      "50": "#F4F6FA",
      "100": "#F2F2F0",
      "200": "#C2C8D2",
      "300": "#8E98A8",
      "400": "#6A788E",
      "500": "#505B74",
      "600": "#35425B",
      "700": "#263248",
      "800": "#172337",
      "900": "#0C1626",
      A100: "#F2F2F0",
      A200: "#C2C8D2",
      A400: "#6A788E",
      A700: "#263248",
    },
    background: {
      default: "#F2F2F0",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#0C1626",
      secondary: "#200037",
      disabled: "#8E98A8",
    },
  },
  typography: {
    fontFamily: `'Inter', sans-serif`,
    h1: {
      fontSize: "4rem",
      fontWeight: 700,
      lineHeight: 1.05,
      letterSpacing: "-0.5px",
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 700,
      lineHeight: 1.1,
      letterSpacing: "-0.5px",
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight: 1.1,
      letterSpacing: "-0.25px",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 400,
      lineHeight: 1.3,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 400,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: "1.125rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 700,
      letterSpacing: "0.25px",
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 700,
      letterSpacing: "0.25px",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
    button: {
      fontSize: "0.9375rem",
      textTransform: "none",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            //input yazı color
            color: "#0C1626", //text.primary
          },
          "& .MuiFormLabel-root": {
            //label color
            color: "#8E98A8", //text.disabled
          },
          "& .MuiInputAdornment-root": {
            //icon color
            color: "#8E98A8", //text.disabled
          },
          "& .MuiInputAdornment-root svg": {
            //icon font
            fontSize: "18px",
          },
          "& .Mui-focused .MuiInputAdornment-root svg": {
            //icon focus color
            color: "#9235E8", //primary.main
          },
        },
      },
    },
    MuiMenu: {
      defaultProps: {
        autoFocus: false
      },
      styleOverrides: {
        paper: {
          marginTop: 4,
          backgroundColor: "#F2F2F0",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
          border: "1px solid rgba(0, 0, 0, 0.15)",
          color: "#0C1626"
        },
      },
    },
  },
});

export default theme;

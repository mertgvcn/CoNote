import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#9235E8',
        light: '#C67FFD',
        dark: '#550293',
      },
      secondary: {
        main: '#4C4452',
        light: '#AAA3B0',
        dark: '#271932'
      },
      info: {
        main: '#195EEB',
        light: '#7BA3FC',
        dark: '#003292',
        contrastText: '#001136',
      },
      warning: {
        main: '#EEA11F',
        light: '#F7D290',
        dark: '#966207',
        contrastText: '#362200'
      },
      success: {
        main: '#35E87D',
        light: '#7FFDB1',
        dark: '#02933C',
        contrastText: '#003716'
      },
      error: {
        main: '#E8353E',
        light: '#FD7F85',
        dark: '#930209',
        contrastText: '#370003'
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
        paper: "#FFFFFF"
      },
      text: {
        primary: "#0C1626",
        secondary: "#200037",
        disabled: "#8E98A8"
      }
    },
    typography: {
      fontFamily: `'Inter', sans-serif`,
      button: {
        textTransform: "none",
      }
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
      },
    },
  });
  
  export default theme;
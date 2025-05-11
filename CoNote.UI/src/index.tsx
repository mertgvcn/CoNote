import ReactDOM from "react-dom/client";
//redux
import { Provider } from "react-redux";
import { store } from "./app/store";
//theming
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import "./global.css";
//components
import { Toaster } from "react-hot-toast";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster />
      <App />
    </ThemeProvider>
  </Provider>
);

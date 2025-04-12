import ReactDOM from 'react-dom/client';
//components
import App from './App';
import { Toaster } from 'react-hot-toast';
//theming
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Toaster />
    <App />
  </ThemeProvider>
);

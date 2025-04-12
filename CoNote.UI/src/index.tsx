import ReactDOM from 'react-dom/client';
//theming
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
//components
import { Toaster } from 'react-hot-toast';
import App from './App';

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

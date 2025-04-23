import { BrowserRouter } from "react-router-dom";
//hooks
import { useAuthData } from "./features/auth/hooks/useAuthData";
//component
import AppRouter from "./routers/AppRouter";

function App() {
  useAuthData();

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;

import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
//redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "./app/store";
import {
  selectAuthIsAppInitialized,
  selectAuthIsAuthenticated,
} from "./features/auth/slices/authSlice";
//utils
import { authService } from "./features/auth/authService";
//component
import Loading from "./components/ui/Loading";
import AppRouter from "./routers/AppRouter";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(selectAuthIsAuthenticated);
  const isAppInitialized = useSelector(selectAuthIsAppInitialized);

  useEffect(() => {
    dispatch(authService.initializeAppData());
  }, [isAuthenticated]);

  if (!isAppInitialized) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;

import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
//redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "./app/store";
import { validateToken } from "./features/auth/authSlice";
//component
import AppRouter from "./routers/AppRouter";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(validateToken());
  }, [dispatch]);
  
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;

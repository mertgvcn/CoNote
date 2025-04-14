import { Route, Routes } from "react-router-dom";
//utils
import { authService } from "../features/auth/authService";
//Layouts
import PublicLayout from "../layouts/PublicLayout";
import AuthLayout from "../layouts/AuthLayout";
//Global Routes
import NotFoundPage from "../pages/common/NotFound/NotFoundPage";
//Public Routes
import LandingPage from "../pages/public/Landing/LandingPage";
import LoginPage from "../pages/public/Login/LoginPage";
import RegisterPage from "../pages/public/Register/RegisterPage";
//Protected Routes
import DashboardPage from "../pages/auth/Dashboard/DashboardPage";

const AppRouter = () => {
  const isAuthenticated = authService.isAuthenticated()

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;

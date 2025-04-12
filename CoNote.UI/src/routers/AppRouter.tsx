import { Route, Routes } from "react-router-dom";
//Layouts
import PublicLayout from "../layouts/PublicLayout";
import MainLayout from "../layouts/MainLayout";
//Global Routes
import NotFoundPage from "../pages/NotFound/NotFoundPage";
//Public Routes
import LandingPage from "../pages/Landing/LandingPage";
import LoginPage from "../pages/Login/LoginPage";
import RegisterPage from "../pages/Register/RegisterPage";
//Protected Routes
import DashboardPage from "../pages/Dashboard/DashboardPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;

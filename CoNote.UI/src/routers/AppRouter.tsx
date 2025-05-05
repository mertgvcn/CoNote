import { Route, Routes } from "react-router-dom";
//utils
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
import WorkspaceDetailsPage from "../pages/auth/WorkspaceDetails/WorkspaceDetailsPage";
import WorksheetPage from "../pages/auth/Worksheet/WorksheetPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/workspace/:id" element={<WorkspaceDetailsPage />} />
        <Route path="/worksheet/:id" element={<WorksheetPage />} />
      </Route>  
    </Routes>
  );
};

export default AppRouter;

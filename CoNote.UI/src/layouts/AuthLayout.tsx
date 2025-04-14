import { Container, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
//Components
import ProtectedRoute from "../features/auth/ProtectedRoute";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

const AuthLayout = () => {
  return (
    <ProtectedRoute>
      <Stack direction="column">
        <Navbar />
        <Stack direction="row">
          <Container maxWidth="xl" disableGutters>
            <Sidebar />
            <Outlet />
          </Container>
        </Stack>
      </Stack>
    </ProtectedRoute>
  );
};

export default AuthLayout;

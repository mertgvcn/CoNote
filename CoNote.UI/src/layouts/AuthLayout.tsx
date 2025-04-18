import { Container, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
//Components
import ProtectedRoute from "../routers/guards/ProtectedRoute";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import PageWrapper from "../components/layout/PageWrapper";

const AuthLayout = () => {
  return (
    <ProtectedRoute>
      <Stack direction="column">
        <Navbar />
        <Stack direction="row">
          <Container maxWidth="xl" disableGutters>
            <PageWrapper>
              <Stack direction="row">
                <Sidebar />
                <Outlet />
              </Stack>
            </PageWrapper>
          </Container>
        </Stack>
      </Stack>
    </ProtectedRoute>
  );
};

export default AuthLayout;

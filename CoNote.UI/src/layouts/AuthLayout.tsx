import { Container, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
//Components
import ProtectedRoute from "../routers/guards/ProtectedRoute";
import Navbar from "../components/layout/Navbar/Navbar";
import Sidebar from "../components/layout/Sidebar/Sidebar";
import PageWrapper from "../components/layout/PageWrapper";

const AuthLayout = () => {
  return (
    <ProtectedRoute>
      <Stack direction="column">
        <Navbar />
        <Stack direction="row">
          <Container maxWidth="xl" disableGutters>
            <Stack direction="row">
              <Sidebar />
              <PageWrapper>
                <Outlet />
              </PageWrapper>
            </Stack>
          </Container>
        </Stack>
      </Stack>
    </ProtectedRoute>
  );
};

export default AuthLayout;

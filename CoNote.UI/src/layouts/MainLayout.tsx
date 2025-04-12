import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
//Components
import ProtectedRoute from "../features/auth/ProtectedRoute";

const MainLayout = () => {
  return (
    <ProtectedRoute>
      <Box>
        <Outlet />
      </Box>
    </ProtectedRoute>
  );
};

export default MainLayout;

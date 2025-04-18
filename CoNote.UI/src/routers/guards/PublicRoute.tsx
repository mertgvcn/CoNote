import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
//redux
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
//components
import { Box, CircularProgress } from "@mui/material";

interface Props {
  children: ReactNode;
}

const PublicRoute = ({ children }: Props) => {
  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth
  );

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;

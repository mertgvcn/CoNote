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

export default function ProtectedRoute({ children }: Props) {
  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth
  );

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "calc(100vh - 64.8px)",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

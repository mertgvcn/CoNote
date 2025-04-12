import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
//utils
import { isAuthenticated } from "./authService";

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

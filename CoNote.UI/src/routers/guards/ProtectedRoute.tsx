import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
//redux
import { useSelector } from "react-redux";
import { selectAuthIsAuthenticated } from "../../features/auth/slices/authSlice";

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const isAuthenticated = useSelector(selectAuthIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

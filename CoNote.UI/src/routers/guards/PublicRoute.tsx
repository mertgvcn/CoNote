import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
//redux
import { useSelector } from "react-redux";
import { selectAuthIsAuthenticated } from "../../features/auth/slices/authSlice";

interface Props {
  children: ReactNode;
}

const PublicRoute = ({ children }: Props) => {
  const isAuthenticated = useSelector(selectAuthIsAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;

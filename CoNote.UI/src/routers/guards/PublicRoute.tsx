import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
//redux
import { useSelector } from "react-redux";
import {
  selectAuthIsAuthenticated,
  selectAuthLoading,
} from "../../features/auth/slices/authSlice";
//components
import Loading from "../../components/ui/Loading";

interface Props {
  children: ReactNode;
}

const PublicRoute = ({ children }: Props) => {
  const isAuthenticated = useSelector(selectAuthIsAuthenticated);
  const loading = useSelector(selectAuthLoading);

  if (loading) return <Loading />;

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;

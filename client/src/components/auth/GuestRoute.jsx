import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function GuestRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return null;
  }
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default GuestRoute;

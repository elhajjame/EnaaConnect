import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import FullPageLoader from "../loading/FullPageLoader";

function GuestRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <FullPageLoader />;
  }
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default GuestRoute;

import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import FullPageLoader from "../loading/FullPageLoader";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <FullPageLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};
export default ProtectedRoute;

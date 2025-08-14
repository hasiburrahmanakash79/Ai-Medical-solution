import { Navigate } from "react-router-dom";
import { getCookie } from "../lib/cookie-utils";
import useMe from "../hooks/useMe";

const ProtectedRoute = ({ children }) => {
  const { data, loading } = useMe();
  const isAuthenticated = getCookie("isAuthenticated") === "true";

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!data?.data?.role === "ADMIN" || !isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default ProtectedRoute;
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  if (!JSON.parse(sessionStorage.getItem("authProps"))?.isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;

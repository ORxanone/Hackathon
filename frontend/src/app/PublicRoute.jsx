import { Navigate } from "react-router-dom";

const PublicRoute = ({ element: Component }) => {
  const token = localStorage.getItem("authToken");

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Component />;
};

export default PublicRoute;

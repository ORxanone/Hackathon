import { Navigate } from "react-router-dom";

const PublicRoute = ({ element: Component }) => {
  const token = localStorage.getItem("authToken");

  if (token) {
    return <Navigate to="/dashboard/boards" replace />;
  }

  return <Component />;
};

export default PublicRoute;

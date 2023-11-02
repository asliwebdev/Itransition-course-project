import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useSelector((store) => store.user);
  console.log(user);
  console.log(requiredRole);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole === "admin" && user?.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};


export default ProtectedRoute
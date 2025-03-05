import { Navigate } from "react-router-dom";
import { useContext, ReactNode } from "react";
import { AuthContext } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode; 
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const auth = useContext(AuthContext);
  if (!auth || !auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;  
};

export default ProtectedRoute;

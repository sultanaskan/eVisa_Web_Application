import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  if(loading) return null;
  // If user exists, render the child routes via <Outlet />
  return user ? <Outlet/> : <Navigate to="/login" />;
}
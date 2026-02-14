import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../context/AppContextProvider";

export const PrivateRoute = () => {
  const { user, loading } = useAppContext();
  if (loading) {
    return <div>Loading...</div>;
  } else if (!user) {
    return <Navigate to="/auth" replace />;
  }
  return <Outlet />;
};

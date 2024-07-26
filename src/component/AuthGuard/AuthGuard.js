import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthGuard = ({ children }) => {
  const isAuthenticated = useSelector((state) => Boolean(state.authUser));
  const currentPath = window.location.pathname;

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to={`/login?redirect=${currentPath}`} />
  );
};

export default AuthGuard;

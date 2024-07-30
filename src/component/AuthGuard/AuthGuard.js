import { Navigate } from "react-router-dom";
import { connect, useSelector } from "react-redux";

const AuthGuard = ({ children }) => {
  const isAuthenticated = useSelector((state) => Boolean(state.authUser));
  const currentPath = window.location.href.toString().split(window.location.host)[1];

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to={`/login?redirectTo=${currentPath}`} />
  );
};

const mapAuthGuard = ({ authedUser }) => ({
  isAuthenticated: !!authedUser,
});

export default connect(mapAuthGuard)(AuthGuard);

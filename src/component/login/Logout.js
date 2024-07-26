import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../../actions/authUser";
import { _path } from "../../constants/_path";

export const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const logoutAndRedirect = async () => {
      await dispatch(handleLogout());
      navigate(_path.LogInUrl);
    };

    logoutAndRedirect();
  }, [dispatch, navigate]);

  return null;
};

export const SET_USER_LOGGIN = "SET_USER_LOGGIN";
export const LOGOUT_USER = "LOGOUT_USER";

export function setAuthUser(authUser) {
  return {
    type: SET_USER_LOGGIN,
    authUser,
  };
}

export function logout() {
  return {
    type: LOGOUT_USER,
  };
}

export function handleLogin(username, password) {
  return (dispatch, getState) => {
    const { allUsers } = getState();

    const user = Object.values(allUsers).find(
      (user) => user.id === username && user.password === password
    );
    if (user) {
      return dispatch(setAuthUser(user));
    }
  };
}

export function handleLogout() {
  return (dispatch) => {
    return dispatch(logout());
  };
}

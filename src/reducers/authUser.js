import { LOGOUT_USER, SET_USER_LOGGIN } from "../actions/authUser";

export default function authUser(state = null, action) {
  switch (action.type) {
    case SET_USER_LOGGIN:
      return action.authUser;
    case LOGOUT_USER:
      return null;
    default:
      return state;
  }
}

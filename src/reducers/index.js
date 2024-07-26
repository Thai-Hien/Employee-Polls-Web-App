// combine reducers

import { combineReducers } from "@reduxjs/toolkit";

import authUser from "./authUser";
import allUsers from "./allUsers.js";
import allQuestions from "./allQuestions";

export default combineReducers({
  authUser,
  allUsers,
  allQuestions,
});

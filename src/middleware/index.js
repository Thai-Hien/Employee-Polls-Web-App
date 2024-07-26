import { thunk } from "redux-thunk";
import logger from "./logger";

const middleware = (getDefaultMiddleware) => {
  const defaultMiddleware = getDefaultMiddleware();
  return [...defaultMiddleware, thunk, logger];
};
export default middleware;

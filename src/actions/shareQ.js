import { receiveallUsers } from "./allUsers";
import { receiveallQuestions } from "./allQuestions";
import { getInitialData } from "../service/api";

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData().then(({ allUsers, allQuestions }) => {
      dispatch(receiveallUsers(allUsers));
      dispatch(receiveallQuestions(allQuestions));
    });
  };
}

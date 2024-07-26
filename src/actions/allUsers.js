export const RECEIVE_allUsers = "RECEIVE_allUsers";
export const ADD_ANSWER_USER = "ADD_ANSWER_USER";
export const ADD_QUESTION_USER = "ADD_QUESTION_USER";

export function receiveallUsers(allUsers) {
  return {
    type: RECEIVE_allUsers,
    allUsers,
  };
}

export function addAnswerUser(authedUser, qid, answer) {
  return {
    type: ADD_ANSWER_USER,
    authedUser,
    qid,
    answer,
  };
}

export function addQuestionUser({ author, id }) {
  return {
    type: ADD_QUESTION_USER,
    author,
    qid: id,
  };
}

import { saveQuestion, saveQuestionAnswer } from "../service/api";
import { addAnswerUser, addQuestionUser } from "./allUsers";

export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_ANSWER_QUESTION = "ADD_ANSWER_QUESTION";
export const RECEIVE_allQuestions = "RECEIVE_allQuestions";

export function receiveallQuestions(allQuestions) {
  return {
    type: RECEIVE_allQuestions,
    allQuestions,
  };
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

function addAnswerQuestion(author, qid, answer) {
  return {
    type: ADD_ANSWER_QUESTION,
    author,
    qid,
    answer,
  };
}

export function handleAddQuestion(firstOption, secondOption) {
  return (dispatch, getState) => {
    const { authUser } = getState();

    return saveQuestion(firstOption, secondOption, authUser).then(
      (question) => {
        dispatch(addQuestion(question));
        dispatch(addQuestionUser(question));
      }
    );
  };
}

export function handleAddAnswer(questionId, answer) {
  return (dispatch, getState) => {
    const { authUser } = getState();
    return saveQuestionAnswer(authUser.id, questionId, answer).then(() => {
      dispatch(addAnswerQuestion(authUser.id, questionId, answer));
      dispatch(addAnswerUser(authUser.id, questionId, answer));
    });
  };
}

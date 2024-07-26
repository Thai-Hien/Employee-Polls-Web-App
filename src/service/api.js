import {
  _getallQuestions,
  _getallUsers,
  _saveQuestion,
  _saveQuestionAnswer,
} from "../utils/Data";

export function getInitialData() {
  return Promise.all([_getallUsers(), _getallQuestions()]).then(
    ([allUsers, allQuestions]) => ({
      allUsers,
      allQuestions,
    })
  );
}

export function saveQuestion(optionOneText, optionTwoText, author) {
  return _saveQuestion({ optionOneText, optionTwoText, author });
}

export function saveQuestionAnswer(authedUserId, qid, answer) {
  return _saveQuestionAnswer({
    authedUser: authedUserId,
    qid,
    answer,
  });
}

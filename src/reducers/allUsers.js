import {
  ADD_ANSWER_USER,
  ADD_QUESTION_USER,
  RECEIVE_allUsers,
} from "../actions/allUsers";

export default function allUsers(state = {}, action) {
  switch (action.type) {
    case RECEIVE_allUsers:
      return {
        ...state,
        ...action.allUsers,
      };
    case ADD_ANSWER_USER:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.qid]: action.answer,
          },
        },
      };
    case ADD_QUESTION_USER:
      return {
        ...state,
        [action.author]: {
          ...state[action.author],
          allQuestions: state[action.author].allQuestions.concat(action.qid),
        },
      };
    default:
      return state;
  }
}

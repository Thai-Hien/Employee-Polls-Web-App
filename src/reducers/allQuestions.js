import {
  ADD_ANSWER_QUESTION,
  ADD_QUESTION,
  RECEIVE_allQuestions,
} from "../actions/allQuestions";

export default function allQuestions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_allQuestions:
      return {
        ...state,
        ...action.allQuestions,
      };
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      };
    case ADD_ANSWER_QUESTION:
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: state[action.qid][action.answer].votes.concat(action.author),
          },
        },
      };
    default:
      return state;
  }
}

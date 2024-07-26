import avatar1 from '../utils/imageAvatar/avt1.png';
import avatar2 from '../utils/imageAvatar/avt2.png';
import avatar3 from '../utils/imageAvatar/avt3.png';
import avatar4 from '../utils/imageAvatar/avt4.png';

let allUsers = {
  sarahedo: {
    id: "sarahedo",
    password: "pass1",
    name: "Sarah Edo",
    avatarURL: avatar1,
    answers: {
      "8xf0y6ziyjabvozdd253nd": "optionOne",
      "6ni6ok3ym7mf1p33lnez": "optionOne",
      am8ehyc8byjqgar0jgpub9: "optionTwo",
      loxhs1bqm25b708cmbf3g: "optionTwo",
    },
    allQuestions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
  },
  miketsamis: {
    id: "miketsamis",
    password: "pass1",
    name: "Mike Tsamis",
    avatarURL: avatar2,
    answers: {
      vthrdm985a262al8qx3do: "optionOne",
      xj352vofupe1dqz9emx13r: "optionTwo",
    },
    allQuestions: ["loxhs1bqm25b708cmbf3g", "vthrdm985a262al8qx3do"],
  },
  tylermcGinnis: {
    id: "tylermcGinnis",
    password: "pass1",
    name: "Tyler McGinnis",
    avatarURL: avatar3,
    answers: {
      xj352vofupe1dqz9emx13r: "optionOne",
      vthrdm985a262al8qx3do: "optionTwo",
      "6ni6ok3ym7mf1p33lnez": "optionOne",
    },
    allQuestions: ["6ni6ok3ym7mf1p33lnez", "xj352vofupe1dqz9emx13r"],
  },
  zenobiaoshikanlu: {
    id: "zenobiaoshikanlu",
    password: "pass1",
    name: "Zenobia Oshikanlu",
    avatarURL: avatar4,
    answers: {
      xj352vofupe1dqz9emx13r: "optionOne",
    },
    allQuestions: [],
  },
};

let allQuestions = {
  "8xf0y6ziyjabvozdd253nd": {
    id: "8xf0y6ziyjabvozdd253nd",
    author: "sarahedo",
    timestamp: 1467166872634,
    optionOne: {
      votes: ["sarahedo"],
      text: "Build our new application with Javascript",
    },
    optionTwo: {
      votes: [],
      text: "Build our new application with Typescript",
    },
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: "6ni6ok3ym7mf1p33lnez",
    author: "tylermcGinnis",
    timestamp: 1468479767190,
    optionOne: {
      votes: [],
      text: "hire more frontend developers",
    },
    optionTwo: {
      votes: ["tylermcGinnis", "sarahedo"],
      text: "hire more backend developers",
    },
  },
  am8ehyc8byjqgar0jgpub9: {
    id: "am8ehyc8byjqgar0jgpub9",
    author: "sarahedo",
    timestamp: 1488579767190,
    optionOne: {
      votes: [],
      text: "conduct a release retrospective 1 week after a release",
    },
    optionTwo: {
      votes: ["sarahedo"],
      text: "conduct release retrospectives quarterly",
    },
  },
  loxhs1bqm25b708cmbf3g: {
    id: "loxhs1bqm25b708cmbf3g",
    author: "miketsamis",
    timestamp: 1482579767190,
    optionOne: {
      votes: [],
      text: "have code reviews conducted by peers",
    },
    optionTwo: {
      votes: ["sarahedo"],
      text: "have code reviews conducted by managers",
    },
  },
  vthrdm985a262al8qx3do: {
    id: "vthrdm985a262al8qx3do",
    author: "miketsamis",
    timestamp: 1489579767190,
    optionOne: {
      votes: ["miketsamis"],
      text: "take a course on ReactJS",
    },
    optionTwo: {
      votes: ["tylermcGinnis"],
      text: "take a course on unit testing with Jest",
    },
  },
  xj352vofupe1dqz9emx13r: {
    id: "xj352vofupe1dqz9emx13r",
    author: "tylermcGinnis",
    timestamp: 1493579767190,
    optionOne: {
      votes: ["tylermcGinnis", "zenobiaoshikanlu"],
      text: "deploy to production once every two weeks",
    },
    optionTwo: {
      votes: ["miketsamis"],
      text: "deploy to production once every month",
    },
  },
};

function generateUID() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

export function _getallUsers() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...allUsers }), 1000);
  });
}

export function _getallQuestions() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...allQuestions }), 1000);
  });
}

function formatQuestion({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author: author.id,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    },
  };
}

export function _saveQuestion(question) {
  return new Promise((resolve, reject) => {
    if (
      !question.optionOneText ||
      !question.optionTwoText ||
      !question.author
    ) {
      reject("Please provide optionOneText, optionTwoText, and author");
    }

    const formattedQuestion = formatQuestion(question);
    setTimeout(() => {
      allQuestions = {
        ...allQuestions,
        [formattedQuestion.id]: formattedQuestion,
      };

      resolve(formattedQuestion);
    }, 1000);
  });
}

export function _saveQuestionAnswer({ authedUser, qid, answer }) {
  return new Promise((resolve, reject) => {
    if (!authedUser || !qid || !answer) {
      reject("Please provide authedUser, qid, and answer");
    }

    setTimeout(() => {
      allUsers = {
        ...allUsers,
        [authedUser]: {
          ...allUsers[authedUser],
          answers: {
            ...allUsers[authedUser].answers,
            [qid]: answer,
          },
        },
      };

      allQuestions = {
        ...allQuestions,
        [qid]: {
          ...allQuestions[qid],
          [answer]: {
            ...allQuestions[qid][answer],
            votes: allQuestions[qid][answer].votes.concat([authedUser]),
          },
        },
      };

      resolve(true);
    }, 500);
  });
}

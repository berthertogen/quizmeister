const create = (quizId) => {
  return {
    quizId,
    team: 'team',
    email: 'email',
    remark: 'remark',
  };
}

const userInput = () => {
  return {
    team: 'team',
    email: 'email',
  }
}

const update = () => {
  return {
    title: 'updated title',
    remark: 'remark',
    type: 2,
    answers: [
      { answerId: 1, text: 'answer 1', correct: true },
      { answerId: 2, text: 'answer 2', correct: false }
    ],
    scoring: {
      scoringId: 1,
      type: 1,
      weightCorrectAnswer: 1,
      weightNoAnswer: 0,
      timeLimitSeconds: undefined,
      timeScoringInterval: undefined
    }
  };
}

const ignoreProperties = () => {
  return [{
    modifiedOn: expect.any(String),
    searchField: expect.any(String),
    shortId: expect.any(String),
    quiz: {
      modifiedOn: expect.any(String),
      searchField: expect.any(String),
      shortId: expect.any(String),
    }
  }];
}

const ignorePropertiesEvent = () => {
  return {
    subscription: {
      modifiedOn: expect.any(String),
      searchField: expect.any(String),
      shortId: expect.any(String),
      quiz: {
        modifiedOn: expect.any(String),
        searchField: expect.any(String),
        shortId: expect.any(String),
      }
    },
  };
}

module.exports = {
  create,
  userInput,
  update,
  ignoreProperties,
  ignorePropertiesEvent,
}
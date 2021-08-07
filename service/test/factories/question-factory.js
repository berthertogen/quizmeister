const create = () => {
  return {
    title: 'title',
    remark: 'remark',
    type: 2,
    answers: [
      { text: 'answer 1', correct: true },
      { text: 'answer 2', correct: false }
    ],
    scoring: {
      type: 1,
      weightCorrectAnswer: 1,
      weightNoAnswer: 0,
      timeLimitSeconds: undefined,
      timeScoringInterval: undefined
    }
  };
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
  return {
    modifiedOn: expect.any(String),
    searchField: expect.any(String),
    shortId: expect.any(String),
  };
}

module.exports = {
  create,
  update,
  ignoreProperties,
}
const quiz = () => ({
  modifiedOn: expect.any(String),
  searchField: expect.any(String),
  shortId: expect.any(String),
});
const round = () => ({
  modifiedOn: expect.any(String),
  searchField: expect.any(String),
  shortId: expect.any(String),
})
const question = () => ({
  modifiedOn: expect.any(String),
  searchField: expect.any(String),
  shortId: expect.any(String),
  rounds: [round()]
})
const stepWithQuestion = () => ({
  question: question(),
  quiz: quiz(),
  round: round()
})
const stepWithoutQuestion = () => ({
  quiz: quiz(),
  round: round()
})

const ignorePropertiesFirstQuestion = () => {
  return {
    step: stepWithQuestion()
  };
}

const ignorePropertiesQuestion = () => {
  return {
    previousStep: stepWithQuestion(),
    step: stepWithQuestion(),
  };
}

const ignorePropertiesAnswers = () => {
  return {
    previousStep: stepWithQuestion(),
    step: stepWithoutQuestion()
  };
}

const ignorePropertiesScores = () => {
  return {
    previousStep: stepWithoutQuestion(),
    step: stepWithoutQuestion()
  };
}

const ignorePropertiesAfterScores = () => {
  return {
    previousStep: stepWithoutQuestion(),
    step: stepWithQuestion(),
  };
}

const ignorePropertiesFinish = () => {
  return {
    previousStep: stepWithoutQuestion(),
    step: {
      quiz: quiz(),
    }
  };
}

module.exports = {
  ignorePropertiesFirstQuestion,
  ignorePropertiesQuestion,
  ignorePropertiesAnswers,
  ignorePropertiesScores,
  ignorePropertiesAfterScores,
  ignorePropertiesFinish
}
const create = (questionIds) => {
  return {
    title: 'title',
    theme: 'theme',
    remark: 'remark',
    questionIds
  };
}

const update = (questionIds) => {
  return {
    title: 'updated title',
    theme: 'theme',
    remark: 'remark',
    questionIds
  };
}

const ignoreProperties = (withQuestions) => {
  const questions = withQuestions
    ? [{
      modifiedOn: expect.any(String),
      searchField: expect.any(String),
      shortId: expect.any(String),
      rounds: [{
        modifiedOn: expect.any(String),
        searchField: expect.any(String),
        shortId: expect.any(String),
      }]
    }]
    : [];
  return {
    modifiedOn: expect.any(String),
    searchField: expect.any(String),
    shortId: expect.any(String),
    questions
  };
}

module.exports = {
  create,
  update,
  ignoreProperties,
}
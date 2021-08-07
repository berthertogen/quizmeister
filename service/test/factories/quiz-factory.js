const create = (roundIds) => {
  return {
    title: 'title',
    date: new Date(2100, 1, 1),
    location: 'location',
    maxSubscriptions: 20,
    remark: 'remark',
    roundIds
  };
}

const update = (roundIds) => {
  return {
    title: 'updated title',
    date: new Date(2100, 1, 1),
    location: 'location',
    maxSubscriptions: 20,
    remark: 'remark',
    roundIds
  };
}

const ignoreProperties = (withRounds) => {
  const rounds = withRounds
    ? [{
      modifiedOn: expect.any(String),
      searchField: expect.any(String),
      shortId: expect.any(String),
    }]
    : [];
  return {
    modifiedOn: expect.any(String),
    searchField: expect.any(String),
    shortId: expect.any(String),
    rounds
  };
}

module.exports = {
  create,
  update,
  ignoreProperties,
}
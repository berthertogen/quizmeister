const request = require('superagent');

const buildUrl = (path) => {
  const url =  `${process.env.SERVICE_URL}/question/${path}`;
  return `${process.env.SERVICE_URL}/question/${path}`;
};

test("should create question on Post", async () => {
  var response = await request
    .post(buildUrl(""))
    .send({
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
    })
    .set("Accept", "application/json");
  expect(response.headers["content-type"]).toBe("application/json; charset=utf-8")
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot({
    modifiedOn: expect.any(String),
    searchField: expect.any(String),
    shortId: expect.any(String),
  });
});

test("should get question on Get", async () => {
  var response = await request
    .get(buildUrl(`1`))
    .set("Accept", "application/json");
  expect(response.headers["content-type"]).toBe("application/json; charset=utf-8")
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot({
    modifiedOn: expect.any(String),
    searchField: expect.any(String),
    shortId: expect.any(String),
  });
});

test("should get questions on Get (search)", async () => {
  var response = await request
    .get(buildUrl(`search/0/20`))
    .set("Accept", "application/json");
  expect(response.headers["content-type"]).toBe("application/json; charset=utf-8")
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot([{
    modifiedOn: expect.any(String),
    searchField: expect.any(String),
    shortId: expect.any(String),
  }]);
});

test("should update question on Put", async () => {
  var response = await request
    .put(buildUrl(`1`))
    .send({
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
    })
    .set("Accept", "application/json");
  expect(response.headers["content-type"]).toBe("application/json; charset=utf-8")
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot({
    modifiedOn: expect.any(String),
    searchField: expect.any(String),
    shortId: expect.any(String),
  });
});

test("should delete question on Delete", async () => {
  var responseDelete = await request
    .delete(buildUrl(`1`))
    .set("Accept", "application/json");
  expect(responseDelete.headers["content-type"]).toBe("application/json; charset=utf-8")
  expect(responseDelete.status).toBe(200);
  var responseGet = await request
    .get(buildUrl(`search/0/20`))
  expect(responseGet.status).toBe(200);
  expect(responseGet.body).toMatchSnapshot();
});

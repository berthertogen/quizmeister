let questionIds;

test("should create round on Post", async () => {
  const responseQuestion = await buildPostRequest("question", "", questionFactory.create());
  questionIds = [responseQuestion.body.questionId];
  const response = await buildPostRequest("round", "", roundFactory.create(questionIds));
  assertContentTypeJsonAndStatus200(response);
  expect(response.body).toMatchSnapshot(roundFactory.ignoreProperties(true));
});

test("should get round on Get", async () => {
  const response = await buildGetRequest('round', '1');
  assertContentTypeJsonAndStatus200(response);
  expect(response.body).toMatchSnapshot(roundFactory.ignoreProperties(true));
});

test("should get round on Get (search)", async () => {
  const response = await buildGetRequest('round', 'search/0/20');
  assertContentTypeJsonAndStatus200(response);
  expect(response.body).toMatchSnapshot([roundFactory.ignoreProperties(true)]);
});

test("should get themes on Get (themes)", async () => {
  const response = await buildGetRequest('round', 'themes');
  assertContentTypeJsonAndStatus200(response);
  expect(response.body).toMatchSnapshot();
});

test("should update round on Put", async () => {
  const response = await buildPutRequest("round", "1", roundFactory.update(questionIds));
  assertContentTypeJsonAndStatus200(response);
  expect(response.body).toMatchSnapshot(roundFactory.ignoreProperties(true));
});

test("should copy round on Put (copy)", async () => {
  const response = await buildPutRequest("round", "1/copy", []);
  assertContentTypeJsonAndStatus200(response);
  expect(response.body).toMatchSnapshot(roundFactory.ignoreProperties(false));
});

test("should delete round on Delete", async () => {
  const responseDelete1 = await buildDeleteRequest("round", "1/true");
  assertContentTypeJsonAndStatus200(responseDelete1);
  const responseDelete2 = await buildDeleteRequest("round", "2/true");
  assertContentTypeJsonAndStatus200(responseDelete2);
  const responseGetRounds = await buildGetRequest('round', 'search/0/20');
  expect(responseGetRounds.status).toBe(200);
  expect(responseGetRounds.body).toMatchSnapshot();
  const responseGetQuestions = await buildGetRequest('question', 'search/0/20');
  expect(responseGetQuestions.status).toBe(200);
  expect(responseGetQuestions.body).toMatchSnapshot();
});

let roundIds;
let shortId;

test("should create quiz on Post", async () => {
  const responseRound = await buildPostRequest("round", "", roundFactory.create([]));
  roundIds = [responseRound.body.roundId];
  const response = await buildPostRequest("quiz", "", quizFactory.create(roundIds));
  expect(response.body).toMatchSnapshot(quizFactory.ignoreProperties(true));
});

test("should get quiz on Get", async () => {
  const response = await buildGetRequest('quiz', '1');
  shortId = response.body.shortId;
  assertContentTypeJsonAndStatus200(response);
  expect(response.body).toMatchSnapshot(quizFactory.ignoreProperties(true));
});

test("should get quiz on Get (shortId)", async () => {
  const response = await buildGetRequest('quiz', `short/${shortId}`);
  assertContentTypeJsonAndStatus200(response);
  expect(response.body).toMatchSnapshot(quizFactory.ignoreProperties(true));
});

test("should get quiz on Get (search)", async () => {
  const response = await buildGetRequest('quiz', 'search/0/20');
  assertContentTypeJsonAndStatus200(response);
  expect(response.body).toMatchSnapshot([quizFactory.ignoreProperties(true)]);
});

test("should update quiz on Put", async () => {
  const response = await buildPutRequest("quiz", "1", quizFactory.update(roundIds));
  assertContentTypeJsonAndStatus200(response);
  expect(response.body).toMatchSnapshot(quizFactory.ignoreProperties(true));
});

test("should update quiz on Put (status)", async () => {
  const response = await buildPutRequest("quiz", "1/status/2", {});
  assertContentTypeJsonAndStatus200(response);
  expect(response.body).toMatchSnapshot(quizFactory.ignoreProperties(true));
});

test("should get quiz on Get (open)", async () => {
  const response = await buildGetRequest('quiz', 'open/0/20');
  assertContentTypeJsonAndStatus200(response);
  expect(response.body).toMatchSnapshot([quizFactory.ignoreProperties(true)]);
});

test("should copy quiz on Put (copy)", async () => {
  const response = await buildPutRequest("quiz", "1/copy", []);
  assertContentTypeJsonAndStatus200(response);
  expect(response.body).toMatchSnapshot(quizFactory.ignoreProperties(false));
});

test("should delete quiz on Delete", async () => {
  const responseDelete1 = await buildDeleteRequest("quiz", "1/true");
  assertContentTypeJsonAndStatus200(responseDelete1);
  const responseDelete2 = await buildDeleteRequest("quiz", "2/true");
  assertContentTypeJsonAndStatus200(responseDelete2);
  const responseGetQuizzes = await buildGetRequest('quiz', 'search/0/20');
  expect(responseGetQuizzes.status).toBe(200);
  expect(responseGetQuizzes.body).toMatchSnapshot();
  const responseGetRounds = await buildGetRequest('round', 'search/0/20');
  expect(responseGetRounds.status).toBe(200);
  expect(responseGetRounds.body).toMatchSnapshot();
});
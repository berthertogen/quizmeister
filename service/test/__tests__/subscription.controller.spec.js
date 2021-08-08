let questionIds;

test("should create round on Post", async () => {
  const responseQuestion = await buildPostRequest("question", "", questionFactory.create());
  questionIds = [responseQuestion.body.questionId];
  const response = await buildPostRequest("round", "", roundFactory.create(questionIds));
  assertContentTypeJsonAndStatus200(response);
  expect(response.body).toMatchSnapshot(roundFactory.ignoreProperties(true));
});

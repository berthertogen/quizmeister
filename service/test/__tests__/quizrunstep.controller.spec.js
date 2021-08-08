test("should get question1 quizrunstep on Get (next)", async () => {
  await buildPostRequest("question", "", questionFactory.create());
  await buildPostRequest("question", "", questionFactory.create());
  await buildPostRequest("question", "", questionFactory.create());
  await buildPostRequest("question", "", questionFactory.create());
  await buildPostRequest("round", "", roundFactory.create([1,2]));
  await buildPostRequest("round", "", roundFactory.create([3,4]));
  await buildPostRequest("quiz", "", quizFactory.create([1,2]));
  await buildPutRequest("quiz", "1/status/5", {});
  await buildPostRequest("subscription", "", subscriptionFactory.create(1));

  const response = await buildGetRequest("quizrunstep", "1/next");
  assertContentTypeJsonAndStatus200(response);
  expect(response.body).toMatchSnapshot(quizrunstepFactory.ignorePropertiesFirstQuestion());
}); 

test("should get question2 quizrunstep on Get (next)", async () => {
  const response = await buildGetRequest("quizrunstep", "1/next");
  assertContentTypeJsonAndStatus200(response);
  expect(response.body).toMatchSnapshot(quizrunstepFactory.ignorePropertiesQuestion());
}); 

test("should get question4 quizrunstep on Get (current)", async () => {
  const response = await buildGetRequest("quizrunstep", "1/current");
  assertContentTypeJsonAndStatus200(response);
  expect(response.body).toMatchSnapshot(quizrunstepFactory.ignorePropertiesQuestion());
}); 

test("should get answers round 1 quizrunstep on Get (next)", async () => {
  const response = await buildGetRequest("quizrunstep", "1/next");
  assertContentTypeJsonAndStatus200(response);
  expect(response.body).toMatchSnapshot(quizrunstepFactory.ignorePropertiesAnswers());
}); 

test("should get scores round 1 quizrunstep on Get (next)", async () => {
  const response = await buildGetRequest("quizrunstep", "1/next");
  assertContentTypeJsonAndStatus200(response);
  expect(response.body).toMatchSnapshot(quizrunstepFactory.ignorePropertiesScores());
}); 

test("should get question3 quizrunstep on Get (next)", async () => {
  const response = await buildGetRequest("quizrunstep", "1/next");
  assertContentTypeJsonAndStatus200(response);
  expect(response.body).toMatchSnapshot(quizrunstepFactory.ignorePropertiesAfterScores());
}); 

test("should get question4 quizrunstep on Get (next)", async () => {
  const response = await buildGetRequest("quizrunstep", "1/next");
  assertContentTypeJsonAndStatus200(response);
  expect(response.body).toMatchSnapshot(quizrunstepFactory.ignorePropertiesQuestion());
}); 

test("should get answers round 2 quizrunstep on Get (next)", async () => {
  const response = await buildGetRequest("quizrunstep", "1/next");
  assertContentTypeJsonAndStatus200(response);
  expect(response.body).toMatchSnapshot(quizrunstepFactory.ignorePropertiesAnswers());
}); 

test("should get scores round 2 quizrunstep on Get (next)", async () => {
  const response = await buildGetRequest("quizrunstep", "1/next");
  assertContentTypeJsonAndStatus200(response);
  expect(response.body).toMatchSnapshot(quizrunstepFactory.ignorePropertiesScores());
}); 

test("should get null quizrunstep on Get (next)", async () => {
  const response = await buildGetRequest("quizrunstep", "1/next");
  assertContentTypeJsonAndStatus200(response);
  expect(response.body).toMatchSnapshot(quizrunstepFactory.ignorePropertiesFinish());
}); 



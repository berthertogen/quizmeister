test("should create subscription on Post", async () => {
  await buildPostRequest("quiz", "", quizFactory.create([]));
  await buildPutRequest("quiz", "1/status/2", {});

  const response = await buildPostRequest("subscription", "", subscriptionFactory.create(1));
  assertContentTypeJsonAndStatus200(response);
  expect(response.body).toMatchSnapshot(subscriptionFactory.ignorePropertiesEvent());
});

test("should get subscription on Get (email)", async () => {
  const response = await buildPostRequest('subscription', 'email', subscriptionFactory.userInput());
  assertContentTypeJsonAndStatus200(response);
  expect(response.body).toMatchSnapshot(subscriptionFactory.ignoreProperties());
});

test("should get subscription on Get (quiz)", async () => {
  const response = await buildGetRequest('subscription', '1');
  assertContentTypeJsonAndStatus200(response);
  expect(response.body).toMatchSnapshot(subscriptionFactory.ignoreProperties());
});

test("should update subscription status Put (status)", async () => {
  await buildPutRequest("quiz", "1/status/4", {});

  const response = await buildPutRequest('subscription', '1/status/2');
  assertContentTypeJsonAndStatus200(response);
  expect(response.body).toMatchSnapshot(subscriptionFactory.ignorePropertiesEvent());
});

test("should delete subscription Delete", async () => {
  const responseDelete = await buildDeleteRequest('subscription', '1');
  assertContentTypeJsonAndStatus200(responseDelete);
  expect(responseDelete.body).toMatchSnapshot(subscriptionFactory.ignorePropertiesEvent());

  const responseGet = await buildGetRequest('subscription', '1');
  assertContentTypeJsonAndStatus200(responseGet);
  expect(responseGet.body).toMatchSnapshot();
});

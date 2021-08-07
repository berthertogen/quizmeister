test("should create question on Post", async () => {
  const response = await buildPostRequest("question", "", questionFactory.create());
  assertContentTypeJsonAndStatus200(response);
  expect(response.body).toMatchSnapshot(questionFactory.ignoreProperties());
});

test("should get question on Get", async () => {
  const response = await buildGetRequest('question', '1');
  assertContentTypeJsonAndStatus200(response);
  expect(response.body).toMatchSnapshot(questionFactory.ignoreProperties());
});

test("should get questions on Get (search)", async () => {
  const response = await buildGetRequest('question', 'search/0/20');
  assertContentTypeJsonAndStatus200(response);
  expect(response.body).toMatchSnapshot([questionFactory.ignoreProperties()]);
});

test("should update question on Put", async () => {
  const response = await buildPutRequest("question", "1", questionFactory.update());
  assertContentTypeJsonAndStatus200(response);
  expect(response.body).toMatchSnapshot(questionFactory.ignoreProperties());
});

test("should copy question on Put (copy)", async () => {
  const response = await buildPutRequest("question", "1/copy", {});
  assertContentTypeJsonAndStatus200(response);
  expect(response.body).toMatchSnapshot(questionFactory.ignoreProperties());
});

test("should delete question on Delete", async () => {
  const responseDelete1 = await buildDeleteRequest("question", "1");
  assertContentTypeJsonAndStatus200(responseDelete1);
  const responseDelete2 = await buildDeleteRequest("question", "2");
  assertContentTypeJsonAndStatus200(responseDelete2);
  const responseGet = await buildGetRequest('question', 'search/0/20');
  expect(responseGet.status).toBe(200);
  expect(responseGet.body).toMatchSnapshot();
});

global.assertContentTypeJson = (response) => {
  expect(response.headers["content-type"]).toBe("application/json; charset=utf-8");
};
global.assertStatus200 = (response) => {
  expect(response.status).toBe(200);
};
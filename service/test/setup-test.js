const request = require('superagent');
const questionFactory = require('./factories/question-factory');
const roundFactory = require('./factories/round-factory');
const quizFactory = require('./factories/quiz-factory');

global.questionFactory = questionFactory;
global.roundFactory = roundFactory;
global.quizFactory = quizFactory;

global.assertContentTypeJsonAndStatus200 = (response) => {
  expect(response.headers["content-type"]).toBe("application/json; charset=utf-8");
  expect(response.status).toBe(200);
};

global.buildGetRequest = async (controller, path) => {
  const url = `${process.env.SERVICE_URL}/${controller}/${path}`;
  return await request
  .get(url)
  .set("Accept", "application/json");
};

global.buildPostRequest = async (controller, path, body) => {
  const url = `${process.env.SERVICE_URL}/${controller}/${path}`;
  return await request
  .post(url)
  .send(body)
  .set("Accept", "application/json");
};

global.buildPutRequest = async (controller, path, body) => {
  const url = `${process.env.SERVICE_URL}/${controller}/${path}`;
  return await request
  .put(url)
  .send(body)
  .set("Accept", "application/json");
};

global.buildDeleteRequest = async (controller, path) => {
  const url = `${process.env.SERVICE_URL}/${controller}/${path}`;
  return await request
  .delete(url)
  .set("Accept", "application/json");
};

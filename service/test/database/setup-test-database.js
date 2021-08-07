const database = require("./clear-database");

beforeAll(async () => {
  await database.clear();
});

afterAll(async () => {
  await database.clear();
});

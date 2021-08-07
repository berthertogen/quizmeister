const database = require("./clear-database");

beforeAll(async () => {
  await database.clear();
});

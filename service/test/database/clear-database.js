const sql = require('mssql');
const fs = require('fs');

const sqlConfig = {
  user: "sa",
  password: "wu4XiEf9D50X",
  database: "Quizmeister",
  server: 'localhost',
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
}


async function clear() {
  try {
    console.log("Clearing database ...");
    const connection = await sql.connect(sqlConfig);
    const sqlText = await fs.readFileSync(`${__dirname}/clear-database.sql`, { encoding: 'utf8'});
    const request = new sql.Request();
    await request.batch(sqlText.trim());
    console.log("Cleared database ...");
    await connection.close();
  } catch (error) {
    console.error("Database clear failed ... should stop", error); 
  }
}

module.exports = {
  clear,
}
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
    const connection = await sql.connect(sqlConfig);
    const sqlText = await fs.readFileSync(`${__dirname}/clear-database.sql`, { encoding: 'utf8'});
    const request = new sql.Request();
    await request.batch(sqlText.trim());
    await connection.close();
  } catch (error) {
    console.error("Database clear failed ... should stop", error); 
  }
}

module.exports = {
  clear,
}
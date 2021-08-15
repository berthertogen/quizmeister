const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose")
const { QuestionRouter } = require("./question/routes");

dotenv.config();

console.log("Test", process.env.DATABASE_URL)

mongoose
  .connect(process.env.DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    const app = express();

    app.use(helmet());
    app.use(cors());
    app.use(express.json());
    app.use("/question", QuestionRouter); 
 
    const PORT = process.env.PORT ?? 5000;  
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
 
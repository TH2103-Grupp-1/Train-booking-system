const express = require("express");
const Database = require("better-sqlite3");

const app = express();
const PORT = 5000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`)
});
import { db } from "../index.js";

export const getAllTimeTables = (req, res) => {
  const statement = db.prepare("SELECT * FROM TimeTables");

  const results = statement.all();

  res.send(results);
}
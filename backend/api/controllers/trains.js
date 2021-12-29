import { db } from "../index.js";

export const getAllTrains = (req, res) => {
  const statement = db.prepare("SELECT * FROM Trains");

  const results = statement.all();

  res.send(results);
}
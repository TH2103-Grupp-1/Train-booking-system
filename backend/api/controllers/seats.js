import { db } from "../index.js";

export const getAllSeats = (req, res) => {
  const statement = db.prepare("SELECT * FROM Seats");

  const results = statement.all();

  res.send(results);
}
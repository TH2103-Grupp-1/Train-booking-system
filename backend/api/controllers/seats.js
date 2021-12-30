import { db } from "../index.js";

export const getAllSeats = (req, res) => {
  const statement = db.prepare("SELECT * FROM Seats");

  const results = statement.all();

  res.send(results);
}

export const getCarriageSeats = (req, res) => {
  res.send(db.prepare("SELECT * FROM Seats WHERE CarriageId = ?").all(req.params.id));
}
import { db } from "../index.js";

export const getAllCarriages = (req, res) => {
  const statement = db.prepare("SELECT * FROM Carriages");

  const results = statement.all();

  res.send(results);
}

export const getCarriagesByTrainId = (req, res) => {
  res.send(db.prepare("SELECT * FROM Carriages WHERE TrainID = ?").all(req.params.id));
}
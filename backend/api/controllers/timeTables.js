import { db } from "../index.js";

export const getAllTimeTables = (req, res) => {
  res.send(db.prepare("SELECT * FROM TimeTables INNER JOIN Trains on TimeTables.TrainId = Trains.TrainId").all());
}
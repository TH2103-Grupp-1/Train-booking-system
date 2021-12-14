import Database from "better-sqlite3";

const db = new Database("../database.db");

export const createTrainStation = (req, res) => {
  let advertisedLocationName = req.body.AdvertisedLocationName;
  let locationSignature = req.body.LocationSignature;
  let coordinates = req.body.Coordinates;

  const insert = db.prepare("INSERT INTO TrainStations (AdvertisedLocationName, LocationSignature, Coordinates) VALUES(?,?,?)");
  insert.run(advertisedLocationName, locationSignature, coordinates);

  return res.send("data inserted");
}

export const getTrainStations = (req, res) => {
  let preparedStatement = db.prepare("SELECT * FROM TrainStations");

  let result = preparedStatement.all();
  res.send(result);
}
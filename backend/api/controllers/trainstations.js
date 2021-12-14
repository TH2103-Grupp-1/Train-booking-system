import Database from "better-sqlite3";

const db = new Database("../database.db");

export const createTrainStation = (req, res) => {

  let trainStations = [];

  console.log(trainStations);

  trainStations = req.body;
  const insert = db.prepare("INSERT INTO TrainStations (AdvertisedLocationName, LocationSignature, Coordinates) VALUES(?,?,?)");
  
  for (let trainStation of trainStations) {
    insert.run(trainStation.AdvertisedLocationName, trainStation.LocationSignature, trainStation.Geometry.WGS84);
  }
  return res.send("data inserted");
}

export const getTrainStations = (req, res) => {
  let preparedStatement = db.prepare("SELECT * FROM TrainStations");

  let result = preparedStatement.all();
  res.send(result);
}
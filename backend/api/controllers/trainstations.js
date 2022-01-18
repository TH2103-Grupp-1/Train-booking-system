import { db } from "../index.js";

export const createTrainStation = (req, res) => {

  let trainStations = [];

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
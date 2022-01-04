import { db } from "../index.js";

export const createBooking = (req, res) => {
  let arrivalTime = req.body.ArrivalTime;
  let customerName = req.body.CustomerName;
  let departureTime = req.body.DepartureTime;
  let fromLocation = req.body.FromLocation;
  let price = req.body.Price;
  let seatId = req.body.SeatId;
  let toLocation = req.body.ToLocation;
  let trainType = req.body.TrainType;

  let preparedStatement = db.prepare("INSERT INTO Bookings (ArrivalTime, CustomerName, DepartureTime, FromLocation, Price, SeatId, ToLocation, TrainType) VALUES(?,?,?,?,?,?,?,?)");

  preparedStatement.run(arrivalTime, customerName, departureTime, fromLocation, price, seatId, toLocation, trainType);

  res.send("Data inserted!");
}

export const getAllBookings = (req, res) => {
  let preparedStatement = db.prepare("SELECT * FROM Bookings");

  let result = preparedStatement.all();

  res.send(result);
}

export const getBookingById = (req, res) => {
  let preparedStatement = db.prepare("SELECT * FROM Bookings WHERE id = ?");

  let booking = preparedStatement.get(req.params.id);

  res.send(booking);
}
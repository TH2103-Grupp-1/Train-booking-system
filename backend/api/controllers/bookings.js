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

export const getBookingsByUserId = (req, res) => {
  let result;
  if (req.query.date !== undefined) {
    result = db.prepare("SELECT * FROM Bookings WHERE DepartureTime >= date(@date) AND UserId = @user").all({ date: req.query.date, user: req.params.id });
  } else {
    result = db.prepare("SELECT * FROM Bookings JOIN Users ON Bookings.UserId = Users.Id WHERE Bookings.UserId = ?").all(req.params.id);
  }
  for (let booking of result) {
    delete booking.Password;
  }
  console.log(result);
  res.send(result);
}
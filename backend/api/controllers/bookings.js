import { db } from "../index.js";

export const createBooking = (req, res) => {
  let arrivalTime = req.body.ArrivalTime;
  let customerName = req.body.CustomerName;
  let departureTime = req.body.DepartureTime;
  let fromLocation = req.body.FromLocation;
  let price = req.body.Price;
  let seatId = req.body.SeatId;
  let seatNumber = req.body.SeatNumber;
  let toLocation = req.body.ToLocation;
  let trainType = req.body.TrainType;
  let userId = req.body.UserId;
  let orderNumber = req.body.OrderNumber;

  let bookingExists = db.prepare("SELECT * FROM Bookings WHERE OrderNumber = ?").all(orderNumber);
  if (bookingExists.length > 0) {
    res.sendStatus(200);
  } else {
    db.prepare("INSERT INTO Bookings (ArrivalTime, CustomerName, DepartureTime, FromLocation, Price, SeatId, SeatNumber, ToLocation, TrainType, UserId, OrderNumber) VALUES(?,?,?,?,?,?,?,?,?,?,?)")
      .run(arrivalTime, customerName, departureTime, fromLocation, price, seatId, seatNumber, toLocation, trainType, userId, orderNumber);
    res.sendStatus(201);
  }
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
  res.send(result);
}
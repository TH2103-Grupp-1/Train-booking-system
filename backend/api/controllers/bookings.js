import { db } from "../index.js";

export const createBooking = (req, res) => {

  let destination = req.body.destination;
  let fromStation = req.body.fromStation
  let departureTime = req.body.departureTime;
  let departureDate = req.body.departureDate;
  let arrivalTime = req.body.arrivalTime;
  let arrivalDate = req.body.arrivalDate;
  let price = req.body.price;
  let email = req.body.email;
  let phoneNumber = req.body.phoneNumber;
  let seatNumber = req.body.seatNumber;
  let carriageNumber = req.body.carriageNumber;
  let trainChanges = req.body.trainChanges;
  let travelClass = req.body.travelClass;
  let returnTrip = req.body.returnTrip;

  console.log(req.body);

  let preparedStatement = db.prepare("INSERT INTO Bookings (Destination, FromStation, DepartureTime, DepartureDate, ArrivalTime, ArrivalDate, Price, Email, PhoneNumber, SeatNumber, CarriageNumber, TrainChanges, TravelClass) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)");

  preparedStatement.run(destination, fromStation, departureTime, departureDate, arrivalTime, arrivalDate, price, email, phoneNumber, seatNumber, carriageNumber, username, trainChanges, travelClass, returnTrip);

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
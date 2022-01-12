import { db } from "../index.js";



export const getAllSeats = async (req, res) => {
  const statement = db.prepare("SELECT * FROM Seats");

  const results = statement.all();

  res.send(results);
}

export const getCarriageSeats = async (req, res) => {
  res.send(db.prepare("SELECT * FROM Seats WHERE CarriageId = ?").all(req.params.id));
}


export const updateSeat = async (req, res) => {
  const { id } = req.params;
  
  let occupied = req.body.occupied;

  let prepareStatement = db.prepare("SELECT Occupied FROM Seats WHERE Id = ?");

  let foundSeat = prepareStatement.get(id);

  foundSeat.occupied = true;

  if(occupied) foundSeat.occupied = occupied;

  let updateSeats = db.prepare('UPDATE Seats SET Occupied = 1 WHERE Id = ?');

  updateSeats.run(id);

  res.json("Seat has been updated");

  



  
}

export const createSeats = async (req, res) => {


  let preparedStatement = db.prepare("INSERT INTO Seats (CarriageId, SeatNumber, Occupied) VALUES(?,?,?)");
  
  for (let index = 1; index <= 20; index++) {
    preparedStatement.run(1, index, 0);
  }
  for (let index = 1; index <= 20; index++) {
    preparedStatement.run(3, index, 0);
  }
  for (let index = 1; index <= 20; index++) {
    preparedStatement.run(5, index, 0);
  }
  for (let index = 1; index <= 20; index++) {
    preparedStatement.run(7, index, 0);
  }
  for (let index = 1; index <= 20; index++) {
    preparedStatement.run(9, index, 0);
  }

  res.send("Data inserted!");
}
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
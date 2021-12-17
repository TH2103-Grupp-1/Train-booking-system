import Database from "better-sqlite3";
import {encrypt} from "./encryption.js"
let db = new Database("../database.db");

export const createUser = async(req, res) => {
  let username = req.body.username;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let phoneNumber = req.body.phoneNumber;
  let password = req.body.password;

  let encryptedPassword = await encrypt(password);

  let preparedStatement = db.prepare("INSERT INTO Users (username, firstName, lastName, email, phoneNumber, password) VALUES(?,?,?,?,?,?)");

  preparedStatement.run(username, firstName, lastName, email, phoneNumber, encryptedPassword);

  res.send("Data inserted!")
}
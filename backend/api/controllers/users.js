import Database from "better-sqlite3";
import {encrypt} from "./encryption.js"
let db = new Database("../database.db");

export const createUser = async(req, res) => {

  let firstName = req.body.user.firstName;
  let lastName = req.body.user.lastName;
  let email = req.body.user.email;
  let phoneNumber = req.body.user.phoneNumber;
  let password = req.body.user.password;

  let encryptedPassword = await encrypt(password);

  let preparedStatement = db.prepare("INSERT INTO Users (FirstName, LastName, Email, PhoneNumber, Password) VALUES(?,?,?,?,?)");

  preparedStatement.run(firstName, lastName, email, phoneNumber, encryptedPassword);

  res.json(201); // 201 = Created
}
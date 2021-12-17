import Database from "better-sqlite3";
import { encrypt } from "./encryption.js"
let db = new Database("../database.db");

export const createUser = async(req, res) => {

  let email = req.body.user.email;
  let firstName = req.body.user.firstName;
  let lastName = req.body.user.lastName;
  let phoneNumber = req.body.user.phoneNumber;
  let password = req.body.user.password;

  let encryptedPassword = await encrypt(password);

  let preparedStatement = db.prepare("INSERT INTO Users (Email, FirstName, LastName, PhoneNumber, Password) VALUES(?,?,?,?,?)");

  preparedStatement.run(email, firstName, lastName, phoneNumber, encryptedPassword);

  res.json(201); // 201 = Created
}
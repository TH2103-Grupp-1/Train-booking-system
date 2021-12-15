import crypto from "crypto";
import Database from "better-sqlite3";

let db = new Database("../database.db");

const algorithm = "aes-256-cbc"
const secretKey = "LooOLisaISIXCoO02l12idxlcozPOIso"
const iv = crypto.randomBytes(16);

const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  let encrypted = cipher.update(text, 'utf-8', 'hex');

  encrypted += cipher.final('hex');

  return encrypted;
}

export const createUser = (req, res) => {
  let username = req.body.username;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let phoneNumber = req.body.phoneNumber;
  let password = req.body.password;

  let encryptedPassword = encrypt(password);

  let preparedStatement = db.prepare("INSERT INTO Users (username, firstName, lastName, email, phoneNumber, password) VALUES(?,?,?,?,?,?)");

  preparedStatement.run(username, firstName, lastName, email, phoneNumber, encryptedPassword);

  res.send("Data inserted!")

}
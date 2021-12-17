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

export const updateUser = async(req, res) => {

  const { id } = req.params;
  const {username, firstName, lastName, email, phoneNumber, password} = req.body;

  let preparedStatement = db.prepare("SELECT * FROM Users WHERE userId = ?");

  let user = preparedStatement.get(id);

  if(username) user.username = username;
  if(firstName) user.firstName = firstName;
  if(lastName) user.lastName = lastName;
  if(email) user.email = email;
  if(phoneNumber) user.phoneNumber = phoneNumber;
  if(password) user.password = password;

  let encryptedPassword = await encrypt(password);

  let userUpdate = db.prepare('UPDATE Users SET username = ?, firstName = ?, lastname = ?, email = ?, phoneNumber = ?, password = ? WHERE userId = ?');

  userUpdate.run(username, firstName, lastName, email, phoneNumber, password, id)
  
  res.send('User updated');
  
}
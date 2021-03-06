import { db } from "../index.js";
import { encrypt } from "./encryption.js"

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

export const updateUser = async(req, res) => {

  const { id } = req.params;
  const {firstName, lastName, email, phoneNumber, password} = req.body.user;

  let preparedStatement = db.prepare("SELECT * FROM Users WHERE Id = ?");

  let foundUser = preparedStatement.get(id);

  if(firstName) foundUser.firstName = firstName;
  if(lastName) foundUser.lastName = lastName;
  if(email) foundUser.email = email;
  if(phoneNumber) foundUser.phoneNumber = phoneNumber;
  if(password) foundUser.password = password;

  let encryptedPassword = await encrypt(password);

  let userUpdate = db.prepare('UPDATE Users SET FirstName = ?, Lastname = ?, Email = ?, PhoneNumber = ?, Password = ? WHERE Id = ?');

  userUpdate.run(firstName, lastName, email, phoneNumber, encryptedPassword, id)
  
  res.json('User has been updated');
  
}
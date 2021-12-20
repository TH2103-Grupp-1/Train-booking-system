import { db } from "../index.js"
import jwt from "jsonwebtoken";

function isInputNull(arg) {
  if (!arg) {
    return true;
  }
  else {
    return false;
  }
}

function isInputTooLong(arg) {
  if (arg.length > 30) {
    return true;
  }
  else {
    return false;
  }
}

export const auth = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.send("Access denied.");
  }
  else {
    const verified = jwt.verify(token, "secretKey");
    req.user = verified;
  }


}

export const validateRegisterUser = (req, res, next) => {
  const email = req.body.user.email;
  const firstName = req.body.user.firstName;
  const lastName = req.body.user.lastName;
  const phoneNumber = req.body.user.phoneNumber;
  const password = req.body.user.password;

  const statement = db.prepare("SELECT * FROM Users WHERE Email = ? OR PhoneNumber = ? ");

  const user = statement.get(email, phoneNumber);

  if (isInputNull(email) || isInputNull(firstName) || isInputNull(lastName) || isInputNull(phoneNumber) || isInputNull(password)) {
    res.json({message:"One or more inputs were empty."});
  }
  else if (isInputTooLong(email) || isInputTooLong(firstName) || isInputTooLong(lastName) || isInputTooLong(phoneNumber) || isInputTooLong(password)) {
    res.json({message: "One or more inputs were too long."});
  }
  else {
    if (user) {
      res.json({message: "An account with this email or phone number already exists." })
    }
    else {
      next();
    }
  } 
}


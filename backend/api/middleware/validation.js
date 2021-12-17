import { db } from "../index.js"

function checkIfNull(arg) {
  if (!arg) {
    return false;
  }
  else {
    return true;
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

  if (!checkIfNull(email) || !checkIfNull(firstName) || !checkIfNull(lastName) || !checkIfNull(phoneNumber) || !checkIfNull(password)) {
    res.send("One or more inputs were empty.");
  }
  else {
    if (user) {
      res.send("An account with this email or phone number already exists.")
    }
    else {
      next();
    }
  }

  
}
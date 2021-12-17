import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { db } from "../index.js";
const router = express.Router();

router.post('/login', async (req, res) => {
    
    console.log(req.body)
    let email = req.body.email;
    let password = req.body.password;

    const preparedStatement = db.prepare("SELECT * FROM Users WHERE Email = ?")

    let user = preparedStatement.get(email);

    if (!user) {
        res.status(400).send("There is no registered user with that email.");
    }
    else {
        //As the bcrypt function is named; it compares the input with the password in the database. 
        //"validPassword" is a boolean. If it's a match, then the returned value is true.
        const validPassword = await bcrypt.compare(password, user.Password);

        if (validPassword) {
            const token = jwt.sign({id: user.id}, "secretKey", { expiresIn: '1h' });
            delete user.Password; // We don't need to send back the PW.
            user.token = token;
            res.json(user);
            // res.header('auth-token', token)
            // res.send(token);
        }
        else {
            res.send("The password was incorrect.")
        }
    }
});

export default router;
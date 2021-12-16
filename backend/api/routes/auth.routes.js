import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { db } from "../index.js";
const router = express.Router();

router.post('/login', async (req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    const preparedStatement = db.prepare("SELECT * FROM Users WHERE email = ?")

    const user = preparedStatement.get(email);

    if (!user) {
        res.status(400).send("There is no registered user with that email.");
    }
    else {
        const validPassword = await bcrypt.compare(password, user.password);

        if (validPassword) {
            const token = jwt.sign({userid: user.userid}, "secretKey", { expiresIn: '1h' });
            res.header('auth-token', token)
            res.send(token)
        }
        else {
            res.send("The password was incorrect.")
        }
    }
});

export default router;
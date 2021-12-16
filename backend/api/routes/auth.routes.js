import express from "express";
import jwt from "jsonwebtoken";
import { decrypt } from "../controllers/crypto.js";

const router = express.Router();

router.post('/login', (req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    const preparedStatement = db.prepare("SELECT * FROM Users WHERE email = ?")

    const user = preparedStatement.get(email);

    if (!user) {
        res.status(400).send("There is no registered user with that email.");
    }
    else {
        let decryptedPassword = decrypt(password);

        if (decryptedPassword === user.password) {
            res.send("Credentials were successfully validated!");
        }
        else {
            res.send("The password was incorrect.")
        }
    }

    jwt.sign({user}, 'secretkey', { expiresIn: '1h' } ,(err, token) => {
        user.token = token;
        res.json({
            user
        });
    });
});

export default router;
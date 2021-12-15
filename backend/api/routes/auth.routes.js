import express from "express";
import jwt from "jsonwebtoken"

const router = express.Router();

router.post('/login', (req, res) => {
    const user = {
        id: 1,
        username: 'liam',
        email: 'liam@gmail.com'
    }

    jwt.sign({user}, 'secretkey', { expiresIn: '1h' } ,(err, token) => {
        res.json({
            token
        });
    });
});

export default router;
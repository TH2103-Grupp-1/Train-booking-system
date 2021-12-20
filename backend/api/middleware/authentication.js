import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.json({message: "Access denied."});
  }
  else {
    try {
      const verified = jwt.verify(token, "secretKey");
      if (verified) {
        next();
      }
    }
    catch (err) {
      res.json({ message: "Token expired. Access denied." });
    }
  }
}
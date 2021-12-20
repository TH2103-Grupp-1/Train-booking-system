import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.send("Access denied.");
  }
  else {
    const verified = jwt.verify(token, "secretKey");
    req.user = verified;
    next();
  }
}
import bodyParser from "body-parser";
import express from "express";
import trainStationRoutes from "./routes/trainstations.js";
import bookingRoutes from "./routes/bookings.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";
import Database from "better-sqlite3";

const app = express();
const PORT = 5000;

export const db = new Database("../database.db");

const corsOptions = {
  origin: 'http://localhost:4200'
}

app.use(cors(corsOptions));
app.use(bodyParser.json({limit: "50mb"}));

app.use("/trainstations", trainStationRoutes);
app.use("/auth", authRoutes);

app.use("/bookings", bookingRoutes);

app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`)
});

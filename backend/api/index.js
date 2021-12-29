import bodyParser from "body-parser";
import express from "express";
import trainStationRoutes from "./routes/trainstations.js";
import bookingRoutes from "./routes/bookings.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.routes.js";
import Database from "better-sqlite3";
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;

export const db = new Database("./database.db");

// app.use(express.static('public/')); // FOR PRODUCTION

app.use(cors()); // ONLY FOR DEVELOPMENT

app.use(bodyParser.json({limit: "50mb"}));

app.use("/api/trainstations", trainStationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);  

app.listen(port, () => console.log('Listening on port ' + port));
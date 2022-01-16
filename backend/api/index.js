import bodyParser from "body-parser";
import express from "express";
import trainStationRoutes from "./routes/trainstations.js"
import bookingRoutes from "./routes/bookings.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.routes.js";
import carriageRoutes from "./routes/carriages.js";
import trainRoutes from "./routes/trains.js";
import seatRoutes from "./routes/seats.js";
import timeTableRoutes from "./routes/timetables.js";
import Database from "better-sqlite3";
import paymentRoutes from "./routes/payment.js";
import cors from 'cors';
import dotenv from 'dotenv'

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

console.log('Running in ' + process.env.NODE_ENV + 'mode.');

app.use(cors()); // ONLY FOR DEVELOPMENT

// app.use(express.static('./public')); // FOR PRODUCTION
export const db = new Database("./database.db");



app.use(bodyParser.json({ limit: "50mb" }));

app.use("/api/trainstations", trainStationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/carriages", carriageRoutes);
app.use("/api/trains", trainRoutes);
app.use("/api/seats", seatRoutes);
app.use("/api/timetables", timeTableRoutes);
app.use("/api/users", userRoutes);

app.get('/*', (req, res) => {
    res.sendFile('index.html', { root: './public' });
});

app.listen(port, () => console.log('Listening on port ' + port));

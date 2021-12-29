import bodyParser from "body-parser";
import express from "express";
import trainStationRoutes from "./routes/trainstations.js";
import bookingRoutes from "./routes/bookings.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.routes.js";
import carriageRoutes from "./routes/carriages.js";
import trainRoutes from "./routes/trains.js";
import seatRoutes from "./routes/seats.js";
import Database from "better-sqlite3";

const app = express();
const port = process.env.PORT || 4000;

export const db = new Database("./database.db");

app.use(express.static('public/'));

app.use(bodyParser.json({limit: "50mb"}));

app.use("/api/trainstations", trainStationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/carriages", carriageRoutes);
app.use("/api/trains", trainRoutes);
app.use("/api/seats")
app.use("/api/users", userRoutes);

app.get("/*", function (req, res) {
    res.sendFile("index.html", { root: "public/" });
  });
  

app.listen(port, () => console.log('Listening on port ' + port));
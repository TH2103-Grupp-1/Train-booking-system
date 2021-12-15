import bodyParser from "body-parser";
import express from "express";

import trainStationRoutes from "./routes/trainstations.js";
import bookingRoutes from "./routes/bookings.js";
const app = express();
const PORT = 5000;

app.use(bodyParser.json({limit: "50mb"}));

app.use("/trainstations", trainStationRoutes);

app.use("/bookings", bookingRoutes)
app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`)
});

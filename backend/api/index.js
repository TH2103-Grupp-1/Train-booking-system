import express from "express";

import trainStationRoutes from "./routes/trainstations.js";
const app = express();
const PORT = 5000;

app.use(express.json());

app.use("/trainstations", trainStationRoutes);

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`)
});

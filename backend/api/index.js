import bodyParser from "body-parser";
import express from "express";
import trainStationRoutes from "./routes/trainstations.js";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";


const corsOptions = {
  origin: 'http://localhost:4200'
}

const app = express();
const PORT = 5000;

app.use(cors(corsOptions));
app.use(bodyParser.json({limit: "50mb"}));

app.use("/trainstations", trainStationRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`)
});

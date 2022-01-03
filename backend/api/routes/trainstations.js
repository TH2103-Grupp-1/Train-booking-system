import express from "express";
import { createTrainStation, getTrainStations } from "../controllers/trainstations.js";
const router = express.Router();

router.post("/", createTrainStation);

router.get("/", getTrainStations);

export default router;

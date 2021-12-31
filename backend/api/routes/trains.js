import express from "express";
import { getTrainById } from "../controllers/trains.js";

const router = express.Router();

router.get("/");

router.get("/:id", getTrainById);


export default router;
import express from "express";
import {getAllCarriages, getCarriagesByTrainId} from "../controllers/carriages.js"
const router = express.Router();

router.get("/", getAllCarriages);

router.get("/:id", getCarriagesByTrainId)

export default router;
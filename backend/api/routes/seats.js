import express from "express";
import {getAllSeats, getCarriageSeats} from "../controllers/seats.js";

const router = express.Router();

router.get("/", getAllSeats);

router.get("/:id", getCarriageSeats);

export default router;
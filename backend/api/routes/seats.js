import express from "express";
import {getAllSeats, getCarriageSeats, updateSeat, createSeats} from "../controllers/seats.js";

const router = express.Router();

router.get("/", getAllSeats);

router.get("/:id", getCarriageSeats);

router.patch("/:id", updateSeat);

router.post("/", createSeats);

export default router;
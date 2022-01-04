import express from "express";
import {getAllSeats, getCarriageSeats, updateSeat} from "../controllers/seats.js";

const router = express.Router();

router.get("/", getAllSeats);

router.get("/:id", getCarriageSeats);

router.patch("/:id", updateSeat);

export default router;
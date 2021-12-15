import express from "express";
import { createBooking, getAllBookings } from "../controllers/bookings.js";
const router = express.Router();

router.post("/", createBooking);

router.get("/", getAllBookings);

router.get("/:id");

export default router;
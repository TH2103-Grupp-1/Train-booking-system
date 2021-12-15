import express from "express";
import { createBooking, getAllBookings, getBookingById } from "../controllers/bookings.js";
const router = express.Router();

router.post("/", createBooking);

router.get("/", getAllBookings);

router.get("/:id", getBookingById);

export default router;
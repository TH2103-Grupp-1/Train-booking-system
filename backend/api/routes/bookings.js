import express from "express";
import { createBooking, getAllBookings, getBookingById, getBookingsByUserId } from "../controllers/bookings.js";
const router = express.Router();

router.post("/", createBooking);

router.get("/", getAllBookings);

router.get("/:id", getBookingById);

router.get("/user/:id", getBookingsByUserId);

export default router;
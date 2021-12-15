import express from "express";
import { createBooking } from "../controllers/bookings.js";
const router = express.Router();

router.post("/", createBooking);

router.get("/");

router.get("/:id");

export default router;
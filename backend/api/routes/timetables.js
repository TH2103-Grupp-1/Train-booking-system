import express from "express";
import { getAllTimeTables } from "../controllers/timetables.js";

const router = express.Router();

router.get("/", getAllTimeTables);

export default router;
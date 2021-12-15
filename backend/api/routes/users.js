import express from "express";
import { createUser } from "../controllers/users.js";
const router = express.Router();

router.post("/", createUser);

router.get("/");

router.get("/:id");

export default router;
import express from "express";
import { createUser } from "../controllers/users.js";
import { validateRegisterUser } from "../middleware/validation.js";

const router = express.Router();

router.post("/", validateRegisterUser, createUser);

router.get("/");

router.get("/:id");

export default router;
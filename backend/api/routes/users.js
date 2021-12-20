import express from "express";
import { createUser, updateUser } from "../controllers/users.js";
import { validateRegisterUser } from "../middleware/validation.js";

const router = express.Router();

router.post("/", validateRegisterUser, createUser);

router.get("/");

router.get("/:id");

router.patch("/:id", updateUser)

export default router;
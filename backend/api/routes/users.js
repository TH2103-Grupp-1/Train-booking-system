import express from "express";
import { createUser } from "../controllers/users.js";
import { updateUser } from "../controllers/users.js";

const router = express.Router();

router.post("/", createUser);

router.get("/");

router.get("/:id");

router.patch("/:id", updateUser);

export default router;
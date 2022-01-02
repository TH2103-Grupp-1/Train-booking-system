import express from "express";
import { checkout, orderSuccess } from "../controllers/payment.js";
const router = express.Router();

router.post("/", checkout);

router.get("/order/success", orderSuccess)

export default router;
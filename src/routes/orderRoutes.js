import express from "express";
import createOrder from "../controllers/orderController.js";
import { authenticateUser } from "../middleware/auth.js";
const router = express.Router();

router.post("/create", authenticateUser, createOrder);

export default router;

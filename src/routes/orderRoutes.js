import express from "express";
import { createOrder, deleteOrder } from "../controllers/orderController.js";
import { authenticateUser } from "../middleware/auth.js";
const router = express.Router();

router.post("/create", createOrder);
router.post("/:id", deleteOrder);

export default router;

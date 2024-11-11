import express from "express";
import * as user from "../controllers/userController.js";

const router = express.Router();

router.post("/create", user.createUser);
router.post("/login", user.loginUser);
router.get("/:userId/orders", user.getUserOrders);

export default router;

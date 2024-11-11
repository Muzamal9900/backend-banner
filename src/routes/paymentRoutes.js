import express from "express";
import * as payment from "../controllers/paymentController.js";
const router = express.Router();

router.post("/create", payment.createPayment);
router.put("/update-status", payment.updatePaymentStatus);

export default router;

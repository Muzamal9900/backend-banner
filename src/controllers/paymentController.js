import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
import { sendPaymentSuccessEmail } from "./emailController.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const prisma = new PrismaClient();

export const createPayment = async (req, res) => {
  const { orderId, amount, currency } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency,
  });
  console.log("ss", paymentIntent);
  try {
    const payment = await prisma.payment.create({
      data: {
        orderId: parseInt(orderId),
        stripeId: paymentIntent.id,
        amount,
        currency,
        status: "pending",
      },
    });
    await sendPaymentSuccessEmail();
    res.json({ clientSecret: paymentIntent.client_secret, payment });
  } catch (error) {
    await prisma.payment.deleteMany({
      where: {
        orderId: parseInt(orderId),
      },
    });

    await prisma.order.delete({
      where: {
        id: parseInt(orderId),
      },
    });
    res.status(500).json({ message: "Something went wrong", error });
  }
};

export const updatePaymentStatus = async (req, res) => {
  const { stripeId, status } = req.body;
  const payment = await prisma.payment.updateMany({
    where: { stripeId },
    data: { status },
  });
  res.json(payment);
};

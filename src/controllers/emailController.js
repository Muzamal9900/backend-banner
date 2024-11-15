import nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVICE,
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendPaymentSuccessEmail = async (orderId) => {
  try {
    // Fetch order details along with the associated user
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: { select: { name: true, email: true } },
      },
    });

    if (!order || !order.user) {
      throw new Error("Order or user information not found.");
    }

    // Extract necessary information for the email
    const { user, productName, size, amount } = order;
    const { name: userName, email: userEmail } = user;

    // Define email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CUSTOMER_SERVICE_EMAIL,
      subject: `Order Confirmation - Order ID: ${orderId}`,
      text: `
        Banner Printing Team,

        A customer has successfully availed of your service with the following details:

        - Customer Name: ${userName}
        - Product: ${productName}
        - Size: ${size}
        - Price: $${amount}
        - Order ID: ${orderId}
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    return order;
  } catch (error) {
    console.error("Error sending payment success email:", error);
    throw error;
  }
};

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

export const sendPaymentSuccessEmail = async () => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      user: { select: { name: true } },
      product: { select: { name: true, size: true, price: true } },
    },
  });
  console.log("order", order);
  //   const mailOptions = {
  //     from: process.env.EMAIL_USER,
  //     to: process.env.CUSTOMER_SERVICE_EMAIL,
  //     subject: `Order Confirmation - Order ID: ${orderId}`,
  //     text: `
  //       Banner Printing Team,

  //       A customer has successfully availed of your service with the following details:

  //       - Customer Name: ${userName}
  //       - Product: ${productName}
  //       - Size: ${size}
  //       - Price: $${price}
  //       - Order ID: ${orderId}
  //     `,
  //   };

  //   await transporter.sendMail(mailOptions);
  return order;
};

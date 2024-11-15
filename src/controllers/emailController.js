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
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: { select: { name: true, email: true } },
      },
    });

    if (!order || !order.user) {
      throw new Error("Order or user information not found.");
    }

    const {
      user,
      productName,
      size,
      amount,
      currency,
      status,
      eyelets,
      polePockets,
      hemming,
      packaging,
      cableTies,
      quantity,
      createdAt,
    } = order;

    // Define email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIEVER_EMAIL,
      subject: `Order Confirmation - Order ID: ${orderId}`,
      text: `
        Banner Printing Team,

        A customer has successfully availed of your service with the following details:

        - Customer Name: ${user.name}
        - Product: ${productName}
        - Size: ${size}
        - Price: ${currency} ${amount.toFixed(2)}
        - Order ID: ${orderId}
        - Order Status: ${status}
        - Eyelets: ${eyelets}
        - Pole Pockets: ${polePockets}
        - Hemming: ${hemming}
        - Packaging: ${packaging}
        - Cable Ties: ${cableTies}
        - Quantity: ${quantity}
        - Order Created At: ${createdAt}

        Thank you for your service!

        Regards,
        Banner Printing Team
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

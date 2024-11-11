import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createOrder = async (req, res) => {
  const {
    userId,
    amount,
    productName,
    size,
    eyelets,
    polePockets,
    hemming,
    packaging,
    cableTies,
  } = req.body;

  if (
    !userId ||
    !amount ||
    !productName ||
    !size ||
    eyelets === undefined ||
    polePockets === undefined ||
    hemming === undefined ||
    packaging === undefined ||
    cableTies === undefined
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const order = await prisma.order.create({
    data: {
      userId: parseInt(userId),
      amount: parseFloat(amount),
      currency: "₤",
      productName,
      size,
      eyelets,
      polePockets,
      hemming,
      packaging,
      cableTies,
      artWork: "dummy",
      status: "pending",
    },
  });

  res.status(201).json({ message: "Order created successfully", order });
};

export default createOrder;

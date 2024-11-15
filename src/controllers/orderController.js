import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createOrder = async (req, res) => {
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
    quantity,
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

  try {
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
        quantity,
        artWork: "dummy",
        status: "pending",
      },
    });

    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const deleteOrder = async (req, res) => {
  await prisma.de;
};

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const createUser = async (req, res) => {
  const { name, email, password, address } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      address,
    },
  });
  const { password: _, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user)
    return res.status(401).json({ message: "Invalid email or password" });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    return res.status(401).json({ message: "Invalid email or password" });

  const orderWithPayment = await prisma.order.findFirst({
    where: {
      userId: user.id,
      payment: {
        status: "paid",
      },
    },
  });

  const orderAvail = orderWithPayment ? true : false;

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      orderAvail: orderAvail,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    message: "Login successful",
    token,
  });
};

export const getUserOrders = async (req, res) => {
  const { userId } = req.params;
  const orders = await prisma.order.findMany({
    where: { userId: parseInt(userId) },
    include: { payment: true },
  });
  res.json(orders);
};

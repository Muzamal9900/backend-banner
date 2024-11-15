import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const createUser = async (req, res) => {
  const {
    name,
    firstName,
    lastName,
    companyName,
    phone,
    streetAddress,
    houseNumberAndStreet,
    flatSuiteUnit,
    townOrCity,
    county,
    postcode,
    email,
    password,
    address,
  } = req.body;
  console.log(req.body);

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return res.status(400).json({
      message:
        "An account with this email already exists. Please login or try with another email.",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        firstName,
        lastName,
        companyName,
        phone,
        streetAddress,
        houseNumberAndStreet,
        flatSuiteUnit,
        townOrCity,
        county,
        postcode,
        email,
        password: hashedPassword,
        address,
      },
    });

    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "User creation failed" });
  }
};

export const updateUser = async (req, res) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });

  if (existingUser) {
    return res.status(400).json({
      message:
        "An account with this email already exists. Please login or try with another email.",
    });
  }
  const reqBoody = req.body;

  try {
    const user = await prisma.user.update({
      data: {
        ...reqBoody,
      },
    });

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "User creation failed" });
  }
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
      firstName: user.firstName,
      lastName: user.lastName,
      companyName: user.companyName,
      phone: user.phone,
      streetAddress: user.streetAddress,
      houseNumberAndStreet: user.houseNumberAndStreet,
      flatSuiteUnit: user.flatSuiteUnit,
      townOrCity: user.townOrCity,
      county: user.county,
      postcode: user.postcode,
      address: user.address,
      orderAvail: orderAvail,
    },
    process.env.JWT_SECRET
  );

  res.json({
    message: "Login successful! Now go and avail printing services.",
    token,
  });
};

export const resetPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Account not found. Please check your email." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    res.json({ message: "Password reset successful. You can now log in." });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password.", error });
  }
};
export const getUserOrders = async (req, res) => {
  const { userId } = req.params;
  const orders = await prisma.order.findMany({
    where: { userId: parseInt(userId) },
    include: { payment: true },
  });
  res.json(orders);
};

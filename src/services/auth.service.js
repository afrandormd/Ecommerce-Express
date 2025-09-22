import prisma from "../../prisma/client/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const validatePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};

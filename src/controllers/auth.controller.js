import prisma from "../../prisma/client/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { errorResponse, successResponse } from "../utils/responses.js";
import { createUser } from "../services/user.service.js";
import cookieOptions from "../utils/cookieOptions.js";

// Register
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if email already used
  const emailExisted = await prisma.user.findUnique({ where: { email } });
  if (emailExisted)
    return errorResponse(res, "Email is already in use", null, 400);

  // Hashing Password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Saving new user to DB
  const user = await createUser({ email, name, password: hashedPassword });

  return successResponse(res, "Register Successfully!", {
    id: user.id,
    name: user.name,
    email: user.email,
  });
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  // Find User
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return errorResponse(res, "Email Not Registered", null, 404);

  // Matching Password
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword)
    return errorResponse(res, "Password Invalid", null, 401);

  // Creating JWT Token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, cookieOptions(req));

  return successResponse(res, "Login Successfully!", {
    userId: user.id,
    email: email,
    token: token,
  });
};

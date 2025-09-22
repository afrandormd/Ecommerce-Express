import prisma from "../../prisma/client/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { errorResponse, successResponse } from "../utils/responses.js";
import { createUser, findUserByEmail } from "../services/user.service.js";
import cookieOptions from "../utils/cookieOptions.js";
import { generateToken, validatePassword } from "../services/auth.service.js";

// Register
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if email already used
  const isEmailExist = await findUserByEmail(email);
  if (isEmailExist)
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
  const user = await findUserByEmail(email);
  if (!user) return errorResponse(res, "Email Not Registered", null, 404);

  // Matching Password
  const isPasswordValid = await validatePassword(password, user.password);
  if (!isPasswordValid)
    return errorResponse(res, "Password Invalid", null, 401);

  // Creating JWT Token
  const token = generateToken({ id: user.id });

  // Set Cookie
  res.cookie("token", token, cookieOptions(req));

  return successResponse(res, "Login Successfully!", {
    userId: user.id,
    email: email,
    token: token,
  });
};

// Logout
export const logout = async (req, res) => {
  res.clearCookie("token", {
    ...cookieOptions(req),
    maxAge: undefined, // override maxAge for deleting cookie has expired
  });

  return successResponse(res, "Logout Successfully");
};

import prisma from "../../prisma/client/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { errorResponse, successResponse } from "../utils/responses.js";
import { createUser } from "../services/user.service.js";

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

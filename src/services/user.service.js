import prisma from "../../prisma/client/index.js";

// Find User By Email
export const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({ where: { email } });
};

// Get All Users
export const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });
};

// Get User by Id
export const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id: id },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });
};

// Create user
export const createUser = async (data) => {
  return await prisma.user.create({
    data,
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });
};

// Update User
export const updateUser = async (id, data) => {
  return await prisma.user.update({
    where: { id: id },
    data,
  });
};

// Delete User
export const deleteUser = async (id) => {
  return await prisma.user.delete({
    where: { id: id },
  });
};

import prisma from "../../prisma/client/index.js";

// Get All Users
export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

// Get User by Id
export const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id: Number(id) },
  });
};

// Create user
export const createUser = async (data) => {
  return await prisma.user.create({ data });
};

// Update User
export const updateUser = async (id, data) => {
  return await prisma.user.update({
    where: { id: Number(id) },
    data,
  });
};

// Delete User
export const deleteUser = async (id) => {
  return await prisma.user.delete({
    where: { id: Number(id) },
  });
};

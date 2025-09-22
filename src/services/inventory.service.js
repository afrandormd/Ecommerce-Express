import prisma from "../../prisma/client/index.js";

export const getAllInventories = async () => {
  return await prisma.inventory.findMany();
};

export const getInventoryById = async (id) => {
  return await prisma.inventory.findUnique({ where: { id: id } });
};

export const createInventory = async (data) => {
  return await prisma.inventory.create({ data });
};

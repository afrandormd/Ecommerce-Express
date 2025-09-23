import prisma from "../../prisma/client/index.js";

export const getAllProducts = async () => {
  return await prisma.product.findMany({ include: { inventory: true } });
};

export const getProductById = async (id) => {
  return await prisma.product.findUnique({ where: { id } });
};

export const getProductByInventoryId = async (inventoryId) => {
  return await prisma.product.findMany({ where: { id: inventoryId } });
};

export const createProduct = async (data) => {
  return await prisma.product.create({ data });
};

export const updateProduct = async (id, data) => {
  return await prisma.product.update({
    where: { id: id },
    data,
  });
};

export const deleteProduct = async (id) => {
  return await prisma.product.delete({
    where: { id: id },
  });
};

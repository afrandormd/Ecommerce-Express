import {
  createInventory,
  getAllInventories,
  getInventoryById,
} from "../services/inventory.service.js";
import { errorResponse, successResponse } from "../utils/responses.js";

export const getInventories = async (req, res) => {
  try {
    const inventories = await getAllInventories();
    return successResponse(res, "Get All Data Inventories", inventories);
  } catch (error) {
    return errorResponse(res, error.message, null, 500);
  }
};

export const getInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const inventory = await getInventoryById(id);
    if (!inventory)
      return res.status(404).json({ message: "Inventory not found" });
    return successResponse(res, `Get Data Inventory ID ${id}`, inventory, 200);
  } catch (error) {
    return errorResponse(res, error.message, null, 500);
  }
};

export const addInventory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description)
      return errorResponse(res, "Please fill all data", null, 401);
    const inventory = await createInventory({ name, description });
    return successResponse(
      res,
      `Success creating data inventory with name ${name}`,
      inventory,
      201,
    );
  } catch (error) {
    return errorResponse(res, error.message, null, 500);
  }
};

export const editInventory = async (req, res) => {};

export const removeInventory = async (req, res) => {};

import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../services/product.service.js";
import { errorResponse, successResponse } from "../utils/responses.js";

export const getProducts = async (req, res) => {
  try {
    const inventories = await getAllProducts();
    return successResponse(res, "Get All Data Inventories", inventories);
  } catch (error) {
    return errorResponse(res, error.message, null, 500);
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    return successResponse(res, `Get Data Product ID ${id}`, product, 200);
  } catch (error) {
    return errorResponse(res, error.message, null, 500);
  }
};

export const addProduct = async (req, res) => {
  try {
    const { name, image, price, stock, description, inventoryId } = req.body;
    if (!name || !description)
      return errorResponse(res, "Please fill all data", null, 401);
    const product = await createProduct({ name, description });
    return successResponse(
      res,
      `Success creating data product with name ${name}`,
      product,
      201,
    );
  } catch (error) {
    return errorResponse(res, error.message, null, 500);
  }
};

export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    // ID Validation
    if (!id) {
      return errorResponse(res, "ID parameter is required", null, 400);
    }

    // Fill Data Validation
    if (!name || !description)
      return errorResponse(res, "Please fill all data", null, 401);

    const product = await updateProduct(id, { name, description });

    return successResponse(
      res,
      `Success updating data product with name ${name}`,
      product,
      200,
    );
  } catch (error) {
    return errorResponse(res, error.message, null, 500);
  }
};

export const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteProduct(id);

    return successResponse(
      res,
      `Success deleting data product with ID: ${id}`,
      null,
      200,
    );
  } catch (error) {
    return errorResponse(res, error.message, null, 500);
  }
};

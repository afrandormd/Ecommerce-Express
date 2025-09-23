import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getProductByInventoryId,
  updateProduct,
} from "../services/product.service.js";
import { cleanImageUrl } from "../utils/cleanImageUrl.js";
import { errorResponse, successResponse } from "../utils/responses.js";
import fs from "node:fs";
import path from "node:path";

export const getProducts = async (req, res) => {
  try {
    const products = await getAllProducts();

    // Get Host
    const base = `${req.protocol}://${req.get("host")}`;

    // Looping Products
    const productsWithImageUrl = products.map((product) => ({
      ...product,
      image: product.image ? cleanImageUrl(base, product.image) : null,
    }));

    return successResponse(res, "Get All Data Products", productsWithImageUrl);
  } catch (error) {
    return errorResponse(res, error.message, null, 500);
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await getProductById(id);

    if (!product)
      return errorResponse(res, `Product with ID ${id} not found`, null, 404);

    // Get Host
    const base = `${req.protocol}://${req.get("host")}`;

    // Looping Products
    const productWithImageUrl = product.map((p) => ({
      ...p,
      image: p.image ? cleanImageUrl(base, p.image) : null,
    }));

    return successResponse(
      res,
      `Get Data Product ID ${id}`,
      productWithImageUrl,
      200,
    );
  } catch (error) {
    return errorResponse(res, error.message, null, 500);
  }
};

export const getProductByInventory = async (req, res) => {
  try {
    const { inventoryId } = req.params;

    const products = await getProductByInventoryId(inventoryId);

    if (!products || products.length === 0)
      return errorResponse(res, "No Products for this inventory", null, 404);

    // Get Host
    const base = `${req.protocol}://${req.get("host")}`;

    // Looping Products
    const productsWithImageUrl = products.map((product) => ({
      ...product,
      image: product.image ? cleanImageUrl(base, product.image) : null,
    }));

    return successResponse(
      res,
      `Success Get All Data Product by Inventory ID`,
      productsWithImageUrl,
      200,
    );
  } catch (error) {
    return errorResponse(res, error.message, null, 500);
  }
};

export const addProduct = async (req, res) => {
  try {
    const { name, price, stock, description, inventoryId } = req.body;

    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!name || !description)
      return errorResponse(res, "Please fill all data", null, 400);

    // Parsing Data
    const parsedData = {
      name,
      price: parseFloat(price), // e.g 100.000
      stock: parseInt(stock), // e.g "1000" -> 1000
      description,
      image,
      inventoryId,
    };

    const product = await createProduct(parsedData);

    // Get Host
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    return successResponse(
      res,
      `Success creating data product with name ${name}`,
      {
        ...product,
        image: product.image ? `${baseUrl}${product.image}` : null,
      },
      201,
    );
  } catch (error) {
    return errorResponse(res, error.message, null, 500);
  }
};

export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, stock, description, inventoryId } = req.body;

    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    // ID Validation
    if (!id) {
      return errorResponse(res, "ID parameter is required", null, 400);
    }

    // Search Exists Product
    const product = await getProductById(id);
    if (!product)
      return errorResponse(res, `Product with ID: ${id} not found`, null, 404);

    // Change Old Image
    if (image && product.image) {
      const oldImagePath = path.join(
        process.cwd(), // Change __dirname with process.cwd()
        "uploads",
        path.basename(product.image),
      );

      fs.unlink(oldImagePath, (error) => {
        if (error) {
          console.warn("Removing old file failed:", oldImagePath);
        } else {
          console.log("Success remove old file:", oldImagePath);
        }
      });
    }

    const updateData = {
      name,
      price: parseFloat(price),
      stock: parseInt(stock),
      description,
      // image,
      inventoryId,
    };
    if (image) updateData.image = image;

    const updatedProduct = await updateProduct(id, updateData);

    // Get Host
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    return successResponse(
      res,
      `Success updating data product with name ${name}`,
      {
        ...updatedProduct,
        image: updatedProduct.image
          ? `${baseUrl}${updatedProduct.image}`
          : null,
      },
      200,
    );
  } catch (error) {
    return errorResponse(res, error.message, null, 500);
  }
};

export const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Search Exists Product
    const product = await getProductById(id);
    if (!product)
      return errorResponse(res, `Product with ID: ${id} not found`, null, 404);

    // Change Old Image
    if (product.image) {
      const oldImagePath = path.join(
        process.cwd(), // Change __dirname with process.cwd()
        "uploads",
        path.basename(product.image),
      );

      fs.unlink(oldImagePath, (error) => {
        if (error) {
          console.warn("Removing old file failed:", oldImagePath);
        } else {
          console.log("Success remove old file:", oldImagePath);
        }
      });
    }

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

import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  getProducts,
  getProduct,
  addProduct,
  editProduct,
  removeProduct,
  getProductByInventory,
} from "../controllers/product.controller.js";
import upload from "../middlewares/upload.js";

const router = Router();

// Public Endpoints
router.get("/", getProducts);
router.get("/:id", getProduct);
router.get("/inventories/:id", getProductByInventory);

// Protected Endpoints
router.post("/", verifyToken, upload.single("image"), addProduct);
router.put("/:id", verifyToken, upload.single("image"), editProduct);
router.delete("/:id", verifyToken, removeProduct);

export default router;

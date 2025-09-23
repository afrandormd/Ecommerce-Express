import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  getProducts,
  getProduct,
  addProduct,
  editProduct,
  removeProduct,
} from "../controllers/product.controller.js";

const router = Router();

router.use(verifyToken); // Need token to access below endpoints
router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", addProduct);
router.put("/:id", editProduct);
router.delete("/:id", removeProduct);

export default router;

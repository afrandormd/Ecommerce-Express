import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  getInventories,
  getInventory,
  addInventory,
  editInventory,
  removeInventory,
} from "../controllers/inventory.route.js";

const router = Router();

router.use(verifyToken); // Need token to access below endpoints
router.get("/", getInventories);
router.get("/:id", getInventory);
router.post("/", addInventory);
router.put("/:id", editInventory);
router.delete("/:id", removeInventory);

export default router;

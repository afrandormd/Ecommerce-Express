import { Router } from "express";
import {
  getUsers,
  addUser,
  getUser,
  editUser,
  removeUser,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", addUser);
router.put("/:id", editUser);
router.get("/:id", removeUser);

export default router;

import {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../services/user.service.js";
import { errorResponse, successResponse } from "../utils/responses.js";

export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    return successResponse(res, "Get All Data Users", users, 200);
  } catch (error) {
    return errorResponse(res, error.message, null, 500);
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return successResponse(res, `Get Data User ID ${id}`, user, 200);
  } catch (error) {
    return errorResponse(res, error.message, null, 500);
  }
};

export const addUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const user = await createUser({ email, name, password });
    return successResponse(
      res,
      `Success creating data user with name ${name}`,
      user,
      201,
    );
  } catch (error) {
    return errorResponse(res, error.message, null, 500);
  }
};

export const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, name, password } = req.body;
    const user = await updateUser(id, { email, name, password });
    return successResponse(
      res,
      `Success updating data user with name ${name}`,
      user,
      200,
    );
  } catch (error) {
    return errorResponse(res, error.message, null, 500);
  }
};

export const removeUser = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUser(id);
    return successResponse(
      res,
      `Success deleting data user with ID: ${id}`,
      null,
      200,
    );
  } catch (error) {
    return errorResponse(res, error.message, null, 500);
  }
};

import {
  getAllUsers,
  createUser,
  getUserById,
} from "../services/user.service.js";

export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    return res.status(200).json({
      success: true,
      message: "Get All Data User",
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({
      success: true,
      message: `Get Data User ID: ${id}`,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error });
  }
};

export const addUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const user = await createUser({ email, name, password });
    return res.status(201).json({
      success: true,
      message: "Create Data User",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user", error });
  }
};

export const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, name, password } = req.body;
    const user = await updateUser(id, { email, name, password });
    return res.status(200).json({
      success: true,
      message: "Update Data User Successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update user", error });
  }
};

export const removeUser = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUser(id);
    return res.status(200).json({
      success: true,
      message: "Delete Data User Successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user", error });
  }
};

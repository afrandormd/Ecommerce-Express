import { getAllUsers, createUser } from "../services/user.service.js";

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

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRoutes from "./src/routes/user.routes.js";
import authRoutes from "./src/routes/auth.route.js";
import inventoryRoutes from "./src/routes/inventory.route.js";

const app = express();

// Load .env
dotenv.config();

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("API Ecommerce Express is Running!");
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/inventories", inventoryRoutes);

export default app;

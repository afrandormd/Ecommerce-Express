import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRoutes from "./src/routes/user.routes.js";

const app = express();

// Load .env
dotenv.config();

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("API Ecommerce Express is Running!");
});

app.use("/users", userRoutes);

export default app;

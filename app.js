// backend/app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ✅ CORS middleware
app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  credentials: true,               // allow cookies / auth headers
}));

// ✅ JSON body parser
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => res.send("Dating App API is live 🚀"));

export default app;

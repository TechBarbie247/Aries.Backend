import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// middleware
app.use(express.json());

// export app for bin/www

export default app;
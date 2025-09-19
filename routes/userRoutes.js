import express from "express";
import { getUser } from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/me", protect, getUser);

export default router;

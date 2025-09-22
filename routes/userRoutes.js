// backend/routes/userRoutes.js
import express from "express";
import { getUser, updateUser } from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/me", protect, getUser);
router.put("/me", protect, updateUser);

export default router;

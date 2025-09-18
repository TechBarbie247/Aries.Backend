import express from "express";
import { getUserProfile, updateUserProfile } from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", protect, getUserProfile);
router.put("/:id", protect, updateUserProfile);

export default router;
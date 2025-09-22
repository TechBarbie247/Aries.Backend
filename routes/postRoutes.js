// backend/routes/postRoutes.js
import express from "express";
import { createPost, getFeedPosts } from "../controllers/postController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, createPost);
router.get("/", getFeedPosts);

export default router;

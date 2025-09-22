// backend/routes/messageRoutes.js
import express from "express";
import { createMessage, getMessagesByMatch } from "../controllers/messageController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, createMessage);
router.get("/:matchId", protect, getMessagesByMatch);

export default router;

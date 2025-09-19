import express from "express";
import { sendMessage, getMessagesFromMatches } from "../controllers/matchController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, sendMessage);
router.get("/", protect, getMessagesFromMatches);

export default router;

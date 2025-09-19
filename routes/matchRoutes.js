import express from "express";
import { protect } from "../middleware/auth.js";
import { createMatch, getMatches } from "../controllers/matchController.js";

const router = express.Router();

router.post("/", protect, createMatch);
router.get("/", protect, getMatches);

export default router;

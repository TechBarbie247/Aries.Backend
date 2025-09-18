import express from "express";
import { createMatch, getUserMatches } from "../controllers/matchController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Create a match
router.route("/").post(protect, createMatch);

// Get matches for the logged-in user
router.route("/my").get(protect, getUserMatches);

export default router;

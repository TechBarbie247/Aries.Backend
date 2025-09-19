import express from "express";
import { createMatch } from "../controllers/matchController";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, createMatch);

export default router;

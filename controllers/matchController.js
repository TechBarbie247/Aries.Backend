import Match from "../models/Match.js";
import User from "../models/User.js";

// CREATE MATCH
export const createMatch = async (req, res) => {
  try {
    const { userId } = req.body;
    const existing = await Match.findOne({ users: { $all: [req.user.id, userId] } });
    if (existing) return res.status(400).json({ message: "Match already exists" });

    const match = await Match.create({ users: [req.user.id, userId] });
    res.status(201).json(match);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET MATCHES
export const getMatches = async (req, res) => {
  try {
    const matches = await Match.find({ users: req.user.id }).populate("users", "username photo bio");
    res.json(matches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
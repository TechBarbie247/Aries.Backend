import Match from "../models/Match.js";

export const createMatch = async (req, res) => {
  try {
    const { userId } = req.body;
    const users = [req.user._id, userId].sort(); // ensure consistent order for unique index

    const existingMatch = await Match.findOne({ users });
    if (existingMatch) return res.status(400).json({ message: "Match already exists" });

    const match = await Match.create({ users });
    res.status(201).json(match);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserMatches = async (req, res) => {
  try {
    const matches = await Match.find({ users: req.user._id }).populate("users", "username email");
    res.json(matches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

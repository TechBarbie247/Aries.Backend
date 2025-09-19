import Match from "../models/Match.js";

export const createMatch = async (req, res) => {
  try {
    const { userId } = req.body; // the person being matched with
    const match = await Match.create({ users: [req.user._id, userId] });
    res.status(201).json(match);
  } catch (error) {
    res.status(500).json({ message: "Error creating match", error });
  }
};

export const getMatches = async (req, res) => {
  try {
    const matches = await Match.find({ users: req.user._id }).populate("users", "username bio photo");
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: "Error fetching matches", error });
  }
};

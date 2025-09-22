// backend/controllers/messageController.js
import Message from "../models/Message.js";

// Send a message
export const createMessage = async (req, res) => {
  const { matchId, text } = req.body;
  try {
    const message = await Message.create({
      match: matchId,
      sender: req.user.id,
      text,
    });
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get messages by match
export const getMessagesByMatch = async (req, res) => {
  try {
    const messages = await Message.find({ match: req.params.matchId })
      .populate("sender", "username profilePhoto")
      .sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

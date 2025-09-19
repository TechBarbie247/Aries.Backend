import Message from "../models/Message.js";

export const sendMessage = async (req, res) => {
  try {
    const { matchId } = req.params;
    const { text } = req.body;

    const message = await Message.create({
      match: matchId,
      sender: req.user._id,
      text
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: "Error sending message", error });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { matchId } = req.params;
    const messages = await Message.find({ match: matchId })
      .populate("sender", "username")
      .sort({ createdAt: 1 }); // oldest → newest
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages", error });
  }
};


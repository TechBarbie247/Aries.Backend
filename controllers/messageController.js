import Message from "../models/Message.js";
import User from "../models/User.js";

export const sendMessage = async (req, res) => {
  try {
    const { receiverId, text } = req.body;
    const message = await Message.create({
      sender: req.user.id,
      receiver: receiverId,
      text
    });
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMessagesFromMatches = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id).populate("matches");
    const matchIds = currentUser.matches.map(match => match._id);

    const messages = await Message.find({
      $or: [
        { sender: currentUser._id, receiver: { $in: matchIds } },
        { receiver: currentUser._id, sender: { $in: matchIds } }
      ]
    })
      .sort({ createdAt: -1 })
      .populate("sender", "username profilePic")
      .populate("receiver", "username profilePic");

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

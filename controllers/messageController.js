import Message from '../models/Message.js';

export const createMessage = async (req, res) => {
  try {
    const { matchId, senderId, text } = req.body;

    const message = await Message.create({
      match: matchId,
      sender: senderId,
      text
    });

    res.status(201).json(message);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getMessagesByMatch = async (req, res) => {
  try {
    const { matchId } = req.params;
    const messages = await Message.find({ match: matchId })
      .populate('sender', 'username email')
      .sort('createdAt');

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

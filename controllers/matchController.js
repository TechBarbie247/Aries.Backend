import User from "../models/User";
import Match from "../models/Match";

export const createMatch = async (req, res) => {
  try {
    const { userId } = req.body; // user to match with
    const currentUser = await User.findById(req.user.id);

    if (!currentUser.matches.includes(userId)) {
      currentUser.matches.push(userId);
      await currentUser.save();
    }

    const otherUser = await User.findById(userId);
    if (!otherUser.matches.includes(currentUser._id)) {
      otherUser.matches.push(currentUser._id);
      await otherUser.save();
    }

    const matchExists = await Match.findOne({ users: { $all: [currentUser._id, userId] } });
    if (!matchExists) {
      await Match.create({ users: [currentUser._id, userId] });
    }

    res.status(200).json({ message: "Match created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

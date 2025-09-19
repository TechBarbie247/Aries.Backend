import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("matches");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  try {
    const post = await Post.create({ user: req.user.id, content: req.body.content });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id).populate("matches");
    const matchIds = currentUser.matches.map(match => match._id);

    const posts = await Post.find({ user: { $in: matchIds } })
      .sort({ createdAt: -1 })
      .populate("user", "username profilePic");

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

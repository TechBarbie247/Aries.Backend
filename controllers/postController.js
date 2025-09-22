// backend/controllers/postController.js
import Post from "../models/Post.js";

// Create a new post
export const createPost = async (req, res) => {
  try {
    const post = await Post.create({ content: req.body.content, user: req.user.id });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get feed posts (all posts)
export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "username profilePhoto bio").sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

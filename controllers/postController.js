import Post from "../models/Post.js";

// Create a post
export const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: "Content is required" });

    const post = await Post.create({ user: req.user._id, content });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "username bio");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: "" },
  interests: { type: [String], default: [] },
  photo: { type: String, default: "" }, // URL to profile photo
});

export default mongoose.model("User", userSchema);

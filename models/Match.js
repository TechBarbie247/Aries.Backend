import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    users: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User" } // both users in the match
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Match", matchSchema);

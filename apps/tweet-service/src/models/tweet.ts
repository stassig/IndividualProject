import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
  user_id: String,
  username: String,
  profile_image_url: String,
  content: String,
  likes_count: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
});

export const Tweet = mongoose.model("Tweet", tweetSchema);

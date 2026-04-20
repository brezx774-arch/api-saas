import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  apiKey: String,
  plan: { type: String, default: "free" },
  requestsToday: { type: Number, default: 0 }
});

export default mongoose.model("User", UserSchema);

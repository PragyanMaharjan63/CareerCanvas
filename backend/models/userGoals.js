import mongoose from "mongoose";

const usergoalsSchema = mongoose.Schema({
  Uid: String,
  goals: [{ name: String, description: String }],
});

const usergoal = mongoose.model("usergoal", usergoalsSchema);
export default usergoal;

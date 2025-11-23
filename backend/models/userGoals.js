import mongoose from "mongoose";

const usergoalsSchema = mongoose.Schema({
  Uid: String,
  goals: [{ Name: String, Description: String }],
});

const usergoal = mongoose.model("usergoal", usergoalsSchema);
export default usergoal;

import mongoose from "mongoose";

const userprojectsSchema = mongoose.Schema({
  Uid: String,
  projects: [{ Title: String, Description: String, Link: String }],
});

const userproject = mongoose.model("userproject", userprojectsSchema);
export default userproject;

import mongoose from "mongoose";

const userprojectsSchema = mongoose.Schema({
  Uid: { type: String, required: true },
  projects: [
    {
      Title: { type: String, required: true },
      Description: { type: String, required: true },
      Link: String,
    },
  ],
});

const userproject = mongoose.model("userproject", userprojectsSchema);
export default userproject;

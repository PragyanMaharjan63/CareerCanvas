import mongoose from "mongoose";

const userSkillsSchema = mongoose.Schema({
  Uid: String,
  skills: [{ name: String, level: String }],
});

const userSkill = mongoose.model("userSkill", userSkillsSchema);
export default userSkill;

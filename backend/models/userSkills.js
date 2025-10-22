import mongoose from "mongoose";

const userSkillsSchema = mongoose.Schema({
  Uid: { type: String, required: true },
  skills: [
    {
      name: { type: String, requried: true },
      level: { type: Number, min: 0, max: 100 },
    },
  ],
});

const userSkill = mongoose.model("userSkill", userSkillsSchema);
export default userSkill;

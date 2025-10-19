import userSkill from "../models/userSkills.js";
import mongoose from "mongoose";
export const getSkills = async (req, res) => {
  try {
    const skills = await userSkill.find();
    if (!skills) {
      res.status(200).json({ message: "Add a new skill" });
    }
    res.status(200).json({ message: skills });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const postSkills = async (req, res) => {
  const { _id } = req.user;
  const { name, level } = req.body;
  try {
    if (!name) {
      res.status(400).json({ message: "Please enter the skills" });
    }

    const userskillexist = await userSkill.findOne({ Uid: _id });
    if (userskillexist) {
      const exist = userskillexist.skills.some((s) => s.name === name);
      if (exist) {
        return res.status(400).json({ message: "Skill already exist" });
      }
      userskillexist.skills.push({ name, level });
      await userskillexist.save();
      return res.status(200).json({ message: "Skill Added" });
    }

    const newSkill = new userSkill({
      Uid: _id,
      skills: [{ name, level }],
    });
    newSkill.save();
    return res.status(200).json({ message: "Skill Added" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const putSkills = (req, res) => {};
export const deleteSkills = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteSkill = await userSkill.findOneAndUpdate(
      {
        "skills._id": id,
      },
      { $pull: { skills: { _id: id } } },
      { new: true }
    );
    if (!deleteSkill) {
      return res.status(404).json({ message: "SKill not found" });
    }
    return res.status(200).json({ message: "Skill deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

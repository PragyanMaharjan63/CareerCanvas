import userGoals from "../models/userGoals.js";

export const getgoals = async (req, res) => {
  try {
    const goals = await userGoals.find({ Uid: req.user._id });
    if (!goals) {
      res.status(404).json({ message: "Add a new Goals" });
    }
    return res.status(200).json({ message: goals });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const setgoals = async (req, res) => {
  const id = req.user._id;
  const { Name, Description } = req.body;
  try {
    if (!Name || !Description) {
      return res
        .status(400)
        .json({ message: "Please Enter the Name and description of Goals" });
    }
    const userGoalsExists = await userGoals.findOne({ Uid: id });
    if (!userGoalsExists) {
      const newGoals = new userGoals({
        Uid: id,
        goals: [{ Name, Description }],
      });
      newGoals.save();
      return res.status(200).json({ message: "Goal added", Goals: newGoals });
    }
    const exists = userGoalsExists.goals.some((s) => s.Name === Name);
    if (exists) {
      return res.status(400).json({ message: "The Goals already exists" });
    }
    userGoalsExists.goals.push({ Name, Description });
    await userGoalsExists.save();
    const newGoals = userGoalsExists.goals[userGoalsExists.goals.length - 1];
    return res.status(200).json({ message: "Added Goals", Goals: newGoals });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteGoals = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteGoals = await userGoals.findOneAndUpdate(
      {
        "goals._id": id,
      },
      { $pull: { goals: { _id: id } } },
      { new: true }
    );
    if (!deleteGoals) {
      return res.status(404).json({ message: "Goals not found" });
    }
    return res.status(200).json({ message: "Goals deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

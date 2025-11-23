import userproject from "../models/userProjects.js";

export const getProjects = async (req, res) => {
  try {
    const projects = await userproject.find({ Uid: req.user._id });
    if (!projects) {
      res.status(404).json({ message: "Add a new Project" });
    }
    return res.status(200).json({ message: projects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const setProjects = async (req, res) => {
  const id = req.user._id;
  const { Title, Description, Link, PreviewLink } = req.body;
  try {
    if (!Title || !Description) {
      return res
        .status(400)
        .json({ message: "Please Enter the Title and description of project" });
    }
    const userProjectExists = await userproject.findOne({ Uid: id });
    if (!userProjectExists) {
      const newProject = new userproject({
        Uid: id,
        projects: [{ Title, Description, Link, PreviewLink }],
      });
      newProject.save();
      return res
        .status(200)
        .json({ message: "Project added", Project: newProject });
    }
    const exists = userProjectExists.projects.some((s) => s.Title === Title);
    if (exists) {
      return res.status(400).json({ message: "The project already exists" });
    }
    userProjectExists.projects.push({ Title, Description, Link, PreviewLink });
    await userProjectExists.save();
    const newProject =
      userProjectExists.projects[userProjectExists.projects.length - 1];
    return res
      .status(200)
      .json({ message: "Added Project", Project: newProject });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProject = await userproject.findOneAndUpdate(
      {
        "projects._id": id,
      },
      { $pull: { projects: { _id: id } } },
      { new: true }
    );
    if (!deleteProject) {
      return res.status(404).json({ message: "project not found" });
    }
    return res.status(200).json({ message: "project deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

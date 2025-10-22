import express from "express";
import { authMiddleware } from "../controllers/AuthUser.js";
import {
  deleteProject,
  getProjects,
  setProjects,
} from "../controllers/UserProjects.js";
const ProjectRoute = express.Router();

ProjectRoute.get("/projects", authMiddleware, getProjects);
ProjectRoute.post("/projects", authMiddleware, setProjects);
ProjectRoute.delete("/projects/:id", authMiddleware, deleteProject);

export default ProjectRoute;

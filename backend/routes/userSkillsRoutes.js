import express from "express";
import { authMiddleware } from "../controllers/AuthUser.js";
import {
  deleteSkills,
  getSkills,
  postSkills,
  putSkills,
} from "../controllers/UserSkills.js";
const SkillRoute = express.Router();

SkillRoute.get("/skills", authMiddleware, getSkills);
SkillRoute.post("/skills", authMiddleware, postSkills);
SkillRoute.put("/skills/:id", authMiddleware, putSkills);
SkillRoute.delete("/skills/:id", authMiddleware, deleteSkills);

export default SkillRoute;

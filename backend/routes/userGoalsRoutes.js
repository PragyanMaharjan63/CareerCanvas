import express from "express";
import { deleteGoals, getgoals, setgoals } from "../controllers/UserGoals.js";
import { authMiddleware } from "../controllers/AuthUser.js";

const GoalsRoute = express.Router();
GoalsRoute.get("/goals", authMiddleware, getgoals);
GoalsRoute.post("/goals", authMiddleware, setgoals);
GoalsRoute.delete("/goals/:id", authMiddleware, deleteGoals);

export default GoalsRoute;

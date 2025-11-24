import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import connnectDB from "../database/connectdatabse.js";
import AuthRoute from "../routes/authuserroutes.js";
import SkillRoute from "../routes/userSkillsRoutes.js";
import ProjectRoute from "../routes/userProjectsRoutes.js";
import GoalsRoute from "../routes/userGoalsRoutes.js";
config();
const app = express();
app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:5173",
  "https://career-canvas-eight.vercel.app/", // your deployed frontend
];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

const PORT = process.env.PORT || 3000;
connnectDB();

app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use("/api/auth", AuthRoute);
app.use("/api", SkillRoute);
app.use("/api", ProjectRoute);
app.use("/api", GoalsRoute);

app.listen(PORT, () => {
  console.log("listening to ", PORT);
});

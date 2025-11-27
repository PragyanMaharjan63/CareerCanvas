import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
import connnectDB from "./database/connectdatabse.js";
import AuthRoute from "./routes/authuserroutes.js";
import SkillRoute from "./routes/userSkillsRoutes.js";
import ProjectRoute from "./routes/userProjectsRoutes.js";
import GoalsRoute from "./routes/userGoalsRoutes.js";
configDotenv();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "https://career-canvas-five.vercel.app",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
connnectDB();

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api/auth", AuthRoute);
app.use("/api", SkillRoute);
app.use("/api", ProjectRoute);
app.use("/api", GoalsRoute);

app.listen(PORT, () => {
  console.log("listening to the", PORT);
});

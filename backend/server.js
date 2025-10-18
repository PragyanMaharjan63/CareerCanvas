import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import connnectDB from "./database/connectdatabse.js";
import AuthRoute from "./routes/authuserroutes.js";
import SkillRoute from "./routes/userSkillsRoutes.js";
config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));
const PORT = process.env.PORT || 3000;
connnectDB();

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api/auth", AuthRoute);
app.use("/api", SkillRoute);

app.listen(PORT, () => {
  console.log("listening to ", PORT);
});

import express from "express";
import {
  login,
  logout,
  signin,
  authMiddleware,
} from "../controllers/AuthUser.js";

const AuthRoute = express.Router();

AuthRoute.post("/signin", signin);
AuthRoute.post("/login", login);
AuthRoute.post("/logout", logout);
AuthRoute.get("/me", authMiddleware, (req, res) => {
  return res.status(200).json({ user: req.user });
});

export default AuthRoute;

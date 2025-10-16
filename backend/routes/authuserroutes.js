import express from "express";
import { login, logout, signin } from "../controllers/AuthUser.js";

const AuthRoute = express.Router();

AuthRoute.post("/signin", signin);
AuthRoute.post("/login", login);
AuthRoute.post("/logout", logout);

export default AuthRoute;

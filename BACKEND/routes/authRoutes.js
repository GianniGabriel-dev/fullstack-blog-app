import express from "express";
import { login, signup } from "../controllers/authController.js";
import { validateNewUser } from "../validators/signupValidator.js";
import { validateLogin } from "../validators/loginValidator.js";

export const AuthRouter = express.Router();

AuthRouter.post("/signup", validateNewUser, signup);
AuthRouter.post("/login", validateLogin, login);

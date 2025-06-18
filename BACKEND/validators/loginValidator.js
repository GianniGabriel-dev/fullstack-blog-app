import { body } from "express-validator";
import { isUsernameTaken } from "../services/userServices.js";


export const validateLogin = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Please enter your username")
    .custom(async (username) => {
      const usernameExists = await isUsernameTaken(username);

      if (!usernameExists) {
        throw new Error("No account found with that username");
      }

      return true;
    }),

  body("password").notEmpty().withMessage("Please enter your password"),
];

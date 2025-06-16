import { body } from "express-validator";
import { isUsernameTaken } from "../services/userServices.js";


export const validateNewUser = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 4, max: 100 })
    .withMessage("Username must be between 4 and 100 characters")
    .custom(async (username) => {
      const existing = await isUsernameTaken(username);
      if (existing) {
        throw new Error("Username is already taken");
      }
      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6, max: 100 })
    .withMessage("Password must be between 6 and 100 characters"),

  body("confirmPassword")
    .notEmpty()
    .withMessage("Password confirmation is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];

// export const validateNewMessage = [
//   body("title")
//     .notEmpty()
//     .withMessage("Title name is required")
//     .isLength({ min: 5, max: 255 })
//     .withMessage("Title must be between 5 and 255 characters"),

//   body("message_text").notEmpty().withMessage("A message text  is required"),
// ];

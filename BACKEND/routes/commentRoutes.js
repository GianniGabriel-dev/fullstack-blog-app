import { Router } from "express";
import passport from "passport";
import { validateNewMessage } from "../validators/loginValidator.js";
import { createNewComment } from "../controllers/commentController.js";

export const commentRouter = Router();

commentRouter.post (
    '/:postId/create-comment', 
    passport.authenticate('jwt', { session: false }), // verifica token
    validateNewMessage,
    createNewComment
)
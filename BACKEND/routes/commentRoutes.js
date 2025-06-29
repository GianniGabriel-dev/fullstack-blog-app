import { Router } from "express";
import passport from "passport";
import { validateNewMessage } from "../validators/loginValidator.js";
import { createNewComment, getAllComments } from "../controllers/commentController.js";

export const commentRouter = Router();

commentRouter.get('/post/:postId/comments', getAllComments)
commentRouter.post (
    '/post/:postId/comments', 
    passport.authenticate('jwt', { session: false }), // verifica token
    validateNewMessage,
    createNewComment
)
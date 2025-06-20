import { Router } from "express";
import { createNewPost, getAllPosts } from "../controllers/postController.js";
import passport from "passport";
import { isAdmin } from "../services/adminServices.js";

export const postRouter = Router();

postRouter.get('/', getAllPosts)
postRouter.post (
    '/create-post', 
    passport.authenticate('jwt', { session: false }), // verifica token
    isAdmin,     //verifica si es admin, si lo es el next middleware se ejecuta y pasa al createNewPost
    createNewPost
)
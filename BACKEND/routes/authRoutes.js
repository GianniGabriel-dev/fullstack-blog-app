import express from 'express';
import { signup } from '../controllers/authController.js';

export const AuthRouter = express.Router();

AuthRouter.post('/signup', signup)
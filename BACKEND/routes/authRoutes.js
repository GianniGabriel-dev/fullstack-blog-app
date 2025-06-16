import express from 'express';
import { signup } from '../controllers/authController.js';
import { validateNewUser } from '../validators/signupValidator.js';

export const AuthRouter = express.Router();

AuthRouter.post('/signup', validateNewUser, signup)
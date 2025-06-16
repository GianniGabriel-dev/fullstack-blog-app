import express from 'express'
import bcyrpt from 'bcrypt'
import { createUser } from '../services/userServices.js';
import { validationResult } from 'express-validator';

export const signup = async (req,res) =>{
  const errors = validationResult(req); //se obtiene los errorres de la validación

    // si hay errores, se devuelve un error 400 con los detalles de los errores
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, password } = req.body;
        const encryptedPassword = await bcyrpt.hash(password, 10);

        const newUser = await createUser(username, encryptedPassword);
        res.json({
        message: "Signup successful",
        user: {
            id: newUser.userId,
            username: newUser.username,
        }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
    }
}
export const login = async (req,res) =>{
    const {username, password} = req.body;
    
}
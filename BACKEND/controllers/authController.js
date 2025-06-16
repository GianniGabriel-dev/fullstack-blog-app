import express from 'express'
import bcyrpt from 'bcrypt'

export const signup = async (req,res) =>{
    const {username, password} = req.body;
    const encriptedPassword = await bcyrpt.hash(password, 10);
    res.json({
        message: "Signup successful",
        user: username,
        encriptedPassword: encriptedPassword,
        password: password
    })
}
export const login = async (req,res) =>{
    const {username, password} = req.body;
    
}
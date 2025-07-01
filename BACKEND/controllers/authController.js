import bcyrpt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createUser,
  getUserByUsername,
  validatePassword,
} from "../services/userServices.js";
import { validationResult } from "express-validator";

export const signup = async (req, res) => {
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
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
  }
};
export const login = async (req, res) => {
  const { username, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await getUserByUsername(username); // se obtiene  todos los datos del usario por su username

    const isValid = await validatePassword(user, password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const payload = {
      id: user.userId,
      username: user.username,
      role: user.role,
    }; //en payload se define lo que queremos que contenga el token
    // se crea el token firmando el payload con la clave secreta y un tiempo de expiración
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      //expiresIn: "1h",
    });

    res.json({
      token,
      message: "Login successful",
      user: { id: user.userId, username: user.username, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};

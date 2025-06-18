import {PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const  prisma = new PrismaClient();

export const createUser = async (username, userPassword) => {
  return await prisma.user.create({
    data: {
        username,
        userPassword
    }
  });
};

export const getUserByUsername = async (username) => {
  return await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
}

export const getUserById = async (userId) =>{
  return await prisma.user.findUnique({
    where: {
      userId : userId,
    },
  });
}

export const validatePassword = async (user, inputPassword) => {
  return await bcrypt.compare(inputPassword, user.userPassword);
};

export const isUsernameTaken = async (username) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  return user != null // devuelve true si use existe y false si no
}
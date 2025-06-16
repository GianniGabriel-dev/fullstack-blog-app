import {PrismaClient } from "@prisma/client";

const  prisma = new PrismaClient();

export const createUser = async (username, userPassword) => {
  return await prisma.user.create({
    data: {
        username,
        userPassword
    }
  });
};

export const isUsernameTaken = async (username) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  return user != null // devuelve true si use existe y false si no
}
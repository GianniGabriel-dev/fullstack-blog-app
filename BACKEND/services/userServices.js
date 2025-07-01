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

export const createComment = async (postId, userId, message)=>{

  return await prisma.messageOfPost.create({
    data: {
      postId,
      userId,
      message
    }
  });
}

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
      userId
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

export const getPosts = async () => {
  return await prisma.blogPost.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

};

export const getComments = async (postId) => {
  return await prisma.messageOfPost.findMany({
    where: {
      postId: postId,
    },
    include: {
      user: {
        select:{
          username:true,
        }
      },
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
};

export const getPostById = async (postId)=>{
  return await prisma.blogPost.findUnique({
    where:{
      postId
    }
  })
}


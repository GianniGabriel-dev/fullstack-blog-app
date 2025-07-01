import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createPost = async (title, messagePost) => {
  return await prisma.blogPost.create({
    data: {
      title,
      messagePost,
    },
  });
};

export const deletePostById = async (postId) => {
  return await prisma.blogPost.delete({
    where: {
      postId,
    },
  });
};

export const updatePostById = async (postId, title, messagePost) => {
  return await prisma.blogPost.update({
    where: {
      postId,
    },
    data: {
      title,
      messagePost,
    },
  });
};

export const isAdmin = (req, res, next) => {
  if (req.user.role === "admin") return next();
  return res.status(403).json({ message: "Forbidden, you are not an admin" });
};
